// Supabase Edge Function: send-contact-email (Deno Runtime)
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (req: Request) => Promise<Response> | Response): void;
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
// Primary destination email registered with Resend testing domain (onboarding@resend.dev)
const DESTINATION_EMAIL = Deno.env.get('CONTACT_NOTIFICATION_EMAIL') || 'developerloki143@gmail.com';

// Standard Supabase Edge Function CORS headers
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req: Request): Promise<Response> => {
  // 1. Gateway & Function Entry Point Log (confirms request reached Deno runtime)
  console.log('[GATEWAY_CHECK] Deno.serve entry point reached for send-contact-email. Method:', req.method);

  // Preflight OPTIONS request handled BEFORE any processing or body parsing
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // 2. Log received payload details
    console.log('Payload received:', JSON.stringify(body));

    // Supports both direct HTTP invocations and Supabase Database Webhooks ({ record: ... })
    const payload = body.record || body;
    const { name, email, subject, message, created_at } = payload || {};

    if (!name || !email || !message) {
      console.warn('Validation error: Missing required payload fields (name, email, message)');
      return new Response(
        JSON.stringify({ error: 'Missing required payload fields (name, email, message)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const formattedTime = created_at
      ? new Date(created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 3. Log email dispatch attempt
    console.log(`Sending email via Resend to ${DESTINATION_EMAIL} from ${name} (${email})`);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [DESTINATION_EMAIL],
        reply_to: email,
        subject: `New Portfolio Message: ${subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #00f0ff; background: #040814; padding: 15px; border-radius: 6px;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Submission Time (IST):</strong> ${formattedTime}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
              ${String(message).replace(/\n/g, '<br />')}
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();

    // 4. Log Resend response details
    console.log('Resend response status:', res.status, JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    // 5. Catch block log
    console.error('Unhandled Edge Function error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

