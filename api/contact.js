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
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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

    try {
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const time = createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const { error } = await resend.emails.send({
                from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
                to: process.env.CONTACT_NOTIFICATION_EMAIL,
                replyTo: doc.email,
                subject: `New Portfolio Message: ${doc.subject}`,
                html: `<div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(doc.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(doc.phone) || 'N/A'}</p>
          <p><strong>Subject:</strong> ${escapeHtml(doc.subject)}</p>
          <p><strong>Time (IST):</strong> ${time}</p>
          <hr/><div>${escapeHtml(doc.message).replace(/\n/g, '<br />')}</div></div>`,
            });
            if (error) console.warn('Resend error:', error);
        }
    } catch (err) {
        console.warn('Resend exception:', err);
    }

    return res.status(200).json({ success: true });
}