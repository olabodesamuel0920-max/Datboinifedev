/**
 * Vercel Serverless Function: api/contact.js
 * Handles secure submission delivery to olabodesamuel0920@gmail.com via Resend API
 */
export default async function handler(req, res) {
    // Enable CORS for localhost testing or Vercel preview routes
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        const { sender_identity, callback_coordinate, communications_payload, system_verify_token } = req.body;

        // 1. Honeypot check: If the hidden field is filled, silently succeed (spam bot trap)
        if (system_verify_token) {
            console.warn('Uplink spam packet caught via honeypot verify token.');
            return res.status(200).json({
                success: true,
                message: 'Packet successfully transmitted (spam caught).'
            });
        }

        // 2. Validation
        if (!sender_identity || !callback_coordinate || !communications_payload) {
            return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(callback_coordinate)) {
            return res.status(400).json({ error: 'Invalid callback email coordinate.' });
        }

        // 3. Check environment
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY environment variable is not defined.');
            return res.status(500).json({ error: 'Mail server coordinate link not configured.' });
        }

        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'olabodesamuel0920@gmail.com';

        // 4. Send via Resend API
        const mailPayload = {
            from: 'Olabode OS <onboarding@resend.dev>',
            to: receiverEmail,
            reply_to: `${sender_identity} <${callback_coordinate}>`,
            subject: `Uplink Notification: ${sender_identity} via Olabode OS`,
            html: `
                <div style="font-family: monospace; padding: 20px; background-color: #0c0d12; color: #a9b2c3; border: 1px solid #1a1e2a; border-radius: 8px;">
                    <h2 style="color: #00f2fe; border-bottom: 1px solid #1a1e2a; padding-bottom: 8px;">SECURE UPLINK PACKET DETECTED</h2>
                    <p style="margin-top: 16px;"><strong>SENDER IDENTITY:</strong> ${sender_identity}</p>
                    <p><strong>CALLBACK COORDINATE:</strong> <a href="mailto:${callback_coordinate}" style="color: #bd5eff; text-decoration: none;">${callback_coordinate}</a></p>
                    <div style="margin-top: 20px; padding: 12px; background-color: #050508; border-left: 2px solid #00f2fe; color: #d1d5db;">
                        <p style="margin: 0; font-weight: bold; color: #8e9aab; font-size: 11px; text-transform: uppercase;">[ COMMUNICATION PAYLOAD ]</p>
                        <p style="margin-top: 8px; white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${communications_payload}</p>
                    </div>
                    <div style="margin-top: 24px; font-size: 10px; color: #5a6578; border-top: 1px solid #1a1e2a; padding-top: 8px; text-align: right;">
                        OLABODE OS // CORE UPLINK STATUS: OPTIMAL
                    </div>
                </div>
            `
        };

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailPayload)
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error('Resend service returned an error:', resendData);
            return res.status(500).json({ error: 'Uplink transmission rejected by mail server.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Uplink transmission successful. Coordinate established.'
        });
    } catch (err) {
        console.error('Serverless contact handler runtime error:', err);
        return res.status(500).json({ error: 'Internal system error occurred.' });
    }
}
