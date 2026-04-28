import nodemailer from 'nodemailer';

/**
 * POST /api/lead
 *
 * Required env vars (Vercel / hosting platform → Project Settings → Env):
 *   SMTP_HOST         e.g. smtp.clinimedia.ca
 *   SMTP_PORT         e.g. 587 (or 465 for SSL)
 *   SMTP_USER         forms@clinimedia.ca
 *   SMTP_PASS         <smtp password>
 *
 * Optional:
 *   SMTP_SECURE       "true" | "false"  (default: true if port=465, else false)
 *   MAIL_FROM         default: forms@clinimedia.ca
 *   MAIL_TO           default: info@tradeleadsmarketing.ca
 */

const escapeHtml = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot — if "website" is filled, silently accept and discard
  if (body.website) return res.status(200).json({ ok: true });

  const name     = (body.name || '').trim();
  const business = (body.business || '').trim();
  const email    = (body.email || '').trim();
  const phone    = (body.phone || '').trim();
  const city     = (body.city || '').trim();
  const service  = (body.service || '').trim();
  const message  = (body.message || '').trim();

  if (!name || !email || !city) {
    return res.status(400).json({ error: 'Name, email, and city are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secureEnv = process.env.SMTP_SECURE;
  const secure = secureEnv != null ? secureEnv === 'true' : port === 465;
  const from = process.env.MAIL_FROM || 'forms@clinimedia.ca';
  const to   = process.env.MAIL_TO   || 'info@tradeleadsmarketing.ca';

  if (!host || !user || !pass) {
    return res.status(500).json({
      error: 'Email service not configured. Please email info@tradeleadsmarketing.ca directly.'
    });
  }

  const transporter = nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass }
  });

  const subject = `New lead — ${name}${business ? ` (${business})` : ''}${city ? ` — ${city}` : ''}`;

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; color:#0F172A; max-width:560px;">
      <div style="background:#0A1B3D; color:#fff; padding:18px 24px; border-radius:12px 12px 0 0;">
        <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#F37021; font-weight:700;">Trade Leads Marketing</div>
        <div style="font-size:18px; font-weight:800; margin-top:4px;">New audit request</div>
      </div>
      <div style="border:1px solid #E2E8F0; border-top:none; padding:24px; border-radius:0 0 12px 12px; background:#fff;">
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 0; color:#64748B; width:130px;">Name</td><td style="padding:6px 0; font-weight:600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0; color:#64748B;">Business</td><td style="padding:6px 0; font-weight:600;">${escapeHtml(business) || '—'}</td></tr>
          <tr><td style="padding:6px 0; color:#64748B;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1E55C7;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0; color:#64748B;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(phone)}" style="color:#1E55C7;">${escapeHtml(phone) || '—'}</a></td></tr>
          <tr><td style="padding:6px 0; color:#64748B;">City</td><td style="padding:6px 0; font-weight:600;">${escapeHtml(city)}</td></tr>
          <tr><td style="padding:6px 0; color:#64748B;">Interested in</td><td style="padding:6px 0;">${escapeHtml(service) || '—'}</td></tr>
        </table>
        <div style="margin-top:16px; padding-top:16px; border-top:1px solid #E2E8F0;">
          <div style="color:#64748B; font-size:12px; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">Message</div>
          <div style="margin-top:6px; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message) || '<em style="color:#94A3B8;">(no message)</em>'}</div>
        </div>
      </div>
      <div style="font-size:11px; color:#94A3B8; margin-top:12px; text-align:center;">
        Submitted via tradeleadsmarketing.ca → /api/lead
      </div>
    </div>`;

  const text =
`New audit request — Trade Leads Marketing

Name:        ${name}
Business:    ${business || '-'}
Email:       ${email}
Phone:       ${phone || '-'}
City:        ${city}
Interested:  ${service || '-'}

Message:
${message || '(no message)'}
`;

  try {
    await transporter.sendMail({
      from: `"Trade Leads Marketing — Form" <${from}>`,
      to,
      replyTo: email,
      subject,
      html,
      text
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead form SMTP error:', err);
    return res.status(500).json({
      error: 'Could not deliver your message right now. Please email info@tradeleadsmarketing.ca directly.'
    });
  }
}
