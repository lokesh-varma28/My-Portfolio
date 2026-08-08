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

// HTML Escaping Utility for XSS Prevention in HTML Emails
const escapeHtml = (text: unknown): string => {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

Deno.serve(async (req: Request): Promise<Response> => {
  // 1. Gateway & Function Entry Point Log (confirms request reached Deno runtime)
  console.log('[GATEWAY_CHECK] Deno.serve entry point reached for send-contact-email. Method:', req.method);

  // Preflight OPTIONS request
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

    console.log('Payload received:', JSON.stringify(body));

    // Supports both direct HTTP invocations and Supabase Database Webhooks ({ record: ... })
    const payload = body.record || body;
    const { name, email, phone, subject, message, created_at } = payload || {};

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

    // HTML escape user inputs for email rendering security
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'N/A');
    const safeSubject = escapeHtml(subject || 'General Inquiry');
    const safeTime = escapeHtml(formattedTime);
    const safeMessageFormatted = escapeHtml(message).replace(/\n/g, '<br />');

    const rawPhone = String(phone || '').trim();
    const telHref = rawPhone ? `tel:${rawPhone.replace(/[^+\d]/g, '')}` : '#';

    // Direct Email Dispatch via Resend to DESTINATION_EMAIL
    console.log(`Sending direct contact email via Resend to ${DESTINATION_EMAIL} from ${name} (${email})`);

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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #090d16; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
          
          <!-- Modern Professional Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Portfolio Message</h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #e0f2fe; opacity: 0.9;">You received a new message from your portfolio</p>
            </td>
          </tr>

          <!-- Main Centered Card Body -->
          <tr>
            <td style="padding: 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <!-- Submitted Details Grid -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      
                      <!-- Name -->
                      <tr>
                        <td width="36" valign="top" style="padding: 10px 0; font-size: 18px;">👤</td>
                        <td style="padding: 10px 0;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Name</div>
                          <div style="font-size: 15px; font-weight: 600; color: #f8fafc; margin-top: 2px;">${safeName}</div>
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td width="36" valign="top" style="padding: 10px 0; font-size: 18px;">📧</td>
                        <td style="padding: 10px 0;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Email</div>
                          <div style="font-size: 15px; font-weight: 600; margin-top: 2px;">
                            <a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a>
                          </div>
                        </td>
                      </tr>

                      <!-- Phone / WhatsApp Number -->
                      <tr>
                        <td width="36" valign="top" style="padding: 10px 0; font-size: 18px;">📱</td>
                        <td style="padding: 10px 0;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Phone / WhatsApp Number</div>
                          <div style="font-size: 15px; font-weight: 600; margin-top: 2px;">
                            <a href="${telHref}" style="color: #34d399; text-decoration: none;">${safePhone}</a>
                          </div>
                        </td>
                      </tr>

                      <!-- Subject -->
                      <tr>
                        <td width="36" valign="top" style="padding: 10px 0; font-size: 18px;">📝</td>
                        <td style="padding: 10px 0;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Subject</div>
                          <div style="font-size: 15px; font-weight: 600; color: #f8fafc; margin-top: 2px;">${safeSubject}</div>
                        </td>
                      </tr>

                      <!-- Submission Time -->
                      <tr>
                        <td width="36" valign="top" style="padding: 10px 0; font-size: 18px;">🕐</td>
                        <td style="padding: 10px 0;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Submission Time (IST)</div>
                          <div style="font-size: 14px; font-weight: 500; color: #94a3b8; margin-top: 2px;">${safeTime}</div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- Message Section (Visually Highlighted Box) -->
                <tr>
                  <td style="padding-top: 12px; border-top: 1px solid #1e293b;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                      💬 Message
                    </div>
                    <div style="background-color: #1e293b; border-left: 4px solid #38bdf8; padding: 18px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #f1f5f9; word-break: break-word;">
                      ${safeMessageFormatted}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b1120; padding: 16px 24px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">Sent from your Portfolio Contact Form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    });

    const data = await res.json();
    console.log('Resend response status:', res.status, JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('Unhandled Edge Function error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
