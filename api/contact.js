import dns from 'node:dns';
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

let clientPromise = globalThis._mongoClientPromise;
function getClient() {
    if (!clientPromise) {
        clientPromise = new MongoClient(process.env.MONGODB_URI).connect();
        globalThis._mongoClientPromise = clientPromise;
    }
    return clientPromise;
}

const escapeHtml = (str = '') =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

function buildContactEmailHtml(doc, timeStr) {
    const safeName = escapeHtml(doc.name);
    const safeEmail = escapeHtml(doc.email);
    // Insert a soft word-break opportunity after @ to allow natural wrapping on very narrow screens
    const displayEmail = safeEmail.replace(/@/g, '@<wbr />');
    const safeSubject = escapeHtml(doc.subject);
    const safeMessage = escapeHtml(doc.message).replace(/\n/g, '<br />');
    const safeTime = escapeHtml(timeStr);
    const encodedSubject = encodeURIComponent(`Re: ${doc.subject}`);

    let phoneRowHtml = '';
    if (doc.phone && String(doc.phone).trim()) {
        const rawPhone = String(doc.phone).trim();
        const cleanPhone = rawPhone.replace(/[^\d+]/g, '');
        // Replace spaces with non-breaking spaces and enforce nowrap to prevent awkward splitting
        const safePhone = escapeHtml(rawPhone).replace(/ /g, '&nbsp;');
        phoneRowHtml = `
                <!-- Phone Row -->
                <tr>
                  <td class="label-cell" width="84" style="width: 84px; padding: 11px 8px 11px 14px; border-bottom: 1px solid #334155; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; white-space: nowrap; line-height: 1.4;">
                    Phone
                  </td>
                  <td class="value-cell" style="padding: 11px 14px 11px 8px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 500; color: #38bdf8; vertical-align: top; line-height: 1.4; white-space: nowrap;">
                    <a href="tel:${cleanPhone}" style="color: #38bdf8; text-decoration: none; font-weight: 500; white-space: nowrap;">
                      ${safePhone}
                    </a>
                  </td>
                </tr>`;
    }

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
  <title>New Contact Form Submission</title>
  <style type="text/css">
    @media only screen and (max-width: 600px) {
      .outer-table {
        padding: 16px 8px !important;
      }
      .main-card {
        border-radius: 8px !important;
      }
      .header-cell {
        padding: 20px 16px 18px 16px !important;
      }
      .body-cell {
        padding: 20px 14px 24px 14px !important;
      }
      .footer-cell {
        padding: 18px 14px 20px 14px !important;
      }
      .label-cell {
        width: 78px !important;
        padding: 10px 6px 10px 12px !important;
        font-size: 10px !important;
      }
      .value-cell {
        padding: 10px 12px 10px 6px !important;
        font-size: 13px !important;
      }
      .reply-btn-table {
        width: 100% !important;
      }
      .reply-btn {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
        padding: 12px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!-- Outer Canvas Table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="outer-table" style="background-color: #0b0f19; width: 100%; margin: 0; padding: 24px 8px;">
    <tr>
      <td align="center">
        <!-- Main Email Container (Max 600px) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="main-card" style="max-width: 600px; width: 100%; background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); background-color: #06b6d4; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="header-cell" style="padding: 24px 22px 20px 22px; background-color: #090e1a; border-bottom: 1px solid #1e293b;">
              <!-- Brand Identity Badge -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                <tr>
                  <td style="background-color: #06b6d4; border-radius: 6px; padding: 4px 8px; font-weight: 800; font-size: 11px; color: #02131e; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    NL
                  </td>
                  <td style="padding-left: 10px; font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.6px; text-transform: uppercase;">
                    Natra Lokesh <span style="color: #475569;">&bull;</span> Portfolio
                  </td>
                </tr>
              </table>

              <!-- Main Heading & Subtitle -->
              <h1 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; line-height: 1.3;">
                New Contact Form Submission
              </h1>
              <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                You&rsquo;ve received a new inquiry through your portfolio contact form.
              </p>
            </td>
          </tr>

          <!-- Body Content Section -->
          <tr>
            <td class="body-cell" style="padding: 24px 20px 28px 20px; background-color: #0f172a;">
              
              <!-- Section Label: SENDER DETAILS -->
              <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #38bdf8; letter-spacing: 1.2px; text-transform: uppercase;">
                Sender Details
              </p>

              <!-- Details Grid Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="details-table" style="width: 100%; background-color: #1e293b; border-radius: 8px; border: 1px solid #334155; margin-bottom: 24px; table-layout: fixed;">
                <!-- Name Row -->
                <tr>
                  <td class="label-cell" width="84" style="width: 84px; padding: 11px 8px 11px 14px; border-bottom: 1px solid #334155; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; white-space: nowrap; line-height: 1.4;">
                    Name
                  </td>
                  <td class="value-cell" style="padding: 11px 14px 11px 8px; border-bottom: 1px solid #334155; font-size: 14px; font-weight: 600; color: #ffffff; vertical-align: top; line-height: 1.4; word-break: normal; overflow-wrap: break-word;">
                    ${safeName}
                  </td>
                </tr>

                <!-- Email Row -->
                <tr>
                  <td class="label-cell" width="84" style="width: 84px; padding: 11px 8px 11px 14px; border-bottom: 1px solid #334155; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; white-space: nowrap; line-height: 1.4;">
                    Email
                  </td>
                  <td class="value-cell" style="padding: 11px 14px 11px 8px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 500; color: #38bdf8; vertical-align: top; line-height: 1.4; word-break: normal; overflow-wrap: anywhere;">
                    <a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none; font-weight: 500; word-break: normal; overflow-wrap: anywhere;">
                      ${displayEmail}
                    </a>
                  </td>
                </tr>
${phoneRowHtml}
                <!-- Subject Row -->
                <tr>
                  <td class="label-cell" width="84" style="width: 84px; padding: 11px 8px 11px 14px; border-bottom: 1px solid #334155; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; white-space: nowrap; line-height: 1.4;">
                    Subject
                  </td>
                  <td class="value-cell" style="padding: 11px 14px 11px 8px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 500; color: #e2e8f0; vertical-align: top; line-height: 1.4; word-break: normal; overflow-wrap: break-word;">
                    ${safeSubject}
                  </td>
                </tr>

                <!-- Timestamp Row -->
                <tr>
                  <td class="label-cell" width="84" style="width: 84px; padding: 11px 8px 11px 14px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; white-space: nowrap; line-height: 1.4;">
                    Received
                  </td>
                  <td class="value-cell" style="padding: 11px 14px 11px 8px; font-size: 12px; color: #cbd5e1; vertical-align: top; line-height: 1.4; word-break: normal; overflow-wrap: break-word;">
                    ${safeTime}
                  </td>
                </tr>
              </table>

              <!-- Section Label: MESSAGE -->
              <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #38bdf8; letter-spacing: 1.2px; text-transform: uppercase;">
                Message Content
              </p>

              <!-- Dedicated Message Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1e293b; border-radius: 8px; border: 1px solid #334155; border-left: 4px solid #06b6d4; margin-bottom: 24px;">
                <tr>
                  <td class="message-cell" style="padding: 16px 18px; font-size: 14px; line-height: 1.6; color: #f1f5f9; word-break: normal; overflow-wrap: break-word;">
                    ${safeMessage}
                  </td>
                </tr>
              </table>

              <!-- Reply Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="reply-btn-table">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #0284c7;">
                    <a href="mailto:${safeEmail}?subject=${encodedSubject}" target="_blank" class="reply-btn" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Reply Directly via Email &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td class="footer-cell" style="padding: 20px 22px 24px 22px; background-color: #090e1a; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                This notification was generated by your portfolio contact form at
                <a href="https://www.natralokesh.in" style="color: #94a3b8; text-decoration: underline;">natralokesh.in</a>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Delivered securely via Resend &bull; Submission saved to MongoDB
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

    const createdAt = new Date();
    const doc = {
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: String(phone || '').slice(0, 50),
        subject: String(subject || 'Portfolio Inquiry').slice(0, 300),
        message: String(message).slice(0, 5000),
        created_at: createdAt,
    };

    try {
        const client = await getClient();
        await client.db(process.env.MONGODB_DB || 'portfolio').collection('contact_submissions').insertOne(doc);
    } catch (err) {
        console.error('MongoDB error:', err);
        return res.status(500).json({ error: 'Could not save your message. Please try again.' });
    }

    let emailSent = false;
    const missingEnv = [];
    if (!process.env.RESEND_API_KEY) missingEnv.push('RESEND_API_KEY');
    if (!process.env.CONTACT_NOTIFICATION_EMAIL) missingEnv.push('CONTACT_NOTIFICATION_EMAIL');

    if (missingEnv.length > 0) {
        console.error('Email skipped: missing env', missingEnv);
    } else {
        try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const formattedDate = createdAt.toLocaleDateString('en-IN', {
                timeZone: 'Asia/Kolkata',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
            const formattedTime = createdAt.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            const timeStr = `${formattedDate}, ${formattedTime} IST`;

            const { data, error } = await resend.emails.send({
                from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
                to: process.env.CONTACT_NOTIFICATION_EMAIL,
                replyTo: doc.email,
                subject: `New Portfolio Message: ${doc.subject}`,
                html: buildContactEmailHtml(doc, timeStr),
            });
            if (error) {
                console.error('Resend failed', {
                    name: error.name,
                    message: error.message,
                    statusCode: error.statusCode,
                });
            } else if (data?.id) {
                emailSent = true;
            }
        } catch (err) {
            console.error('Resend failed', {
                name: err.name,
                message: err.message,
                statusCode: err.statusCode,
            });
        }
    }

    return res.status(200).json({ success: true, emailSent });
}