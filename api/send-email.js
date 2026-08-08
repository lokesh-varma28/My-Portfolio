import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const destinationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'lokeshvarmakshatriya@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, created_at } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const formattedTime = created_at
      ? new Date(created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Send email notification via Resend API securely server-side
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: destinationEmail,
      subject: `New Portfolio Message: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; rounded: 8px;">
          <h2 style="color: #00f0ff; background: #040814; padding: 15px; border-radius: 6px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Submission Time (IST):</strong> ${formattedTime}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Resend Email Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email notification' });
  }
}
