import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, telefono, email, servicio, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    await resend.emails.send({
      from: 'Voltimur Web <noreply@voltimur.com>',
      to: 'voltimur@outlook.es',
      replyTo: email,
      subject: `Nueva solicitud: ${servicio}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2b90ff;">Nueva solicitud de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Nombre</td><td style="padding: 8px 0;"><strong>${nombre}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Teléfono</td><td style="padding: 8px 0;"><strong>${telefono || 'No indicado'}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><strong>${email}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Servicio</td><td style="padding: 8px 0;"><strong>${servicio}</strong></td></tr>
          </table>
          <h3 style="color: #666; margin-top: 24px;">Mensaje</h3>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${mensaje}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
}
