import nodemailer from 'nodemailer';

// Helper to map pillar IDs to readable names
function getPillarName(id) {
  switch (id) {
    case 'a': return '💡 Innovación sin Límites';
    case 'b': return '❤️ Impacto Social';
    case 'c': return '🏛️ Excelencia Arquitectónica';
    default: return id;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { contractorName, voiceText, completedAt, pillars } = req.body;

  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt((process.env.SMTP_PORT || '465').trim());
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();

  if (!host || !user || !pass) {
    console.error('[SMTP Error] Missing configuration:', { host, user, hasPass: !!pass });
    return res.status(500).json({ error: 'Configuración de SMTP incompleta en el entorno' });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const parsedPillars = Array.isArray(pillars) && pillars.length > 0
    ? pillars.map(getPillarName).join(', ')
    : 'Ninguno seleccionado';

  try {
    const mailOptions = {
      from: `"Talento ELITE 24 STUDIO" <${user}>`,
      to: user, // Send notification to HR / Admin email
      subject: `🎉 Nuevo Onboarding Completado - ${contractorName}`,
      html: `
        <div style="font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #06010f; color: #ffffff; padding: 30px; border-radius: 20px; border: 1px solid rgba(124, 58, 237, 0.2); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
          <!-- Logo & Header -->
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #7c3aed, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 10px 0 5px 0;">
              ELITE 24 STUDIO
            </h1>
            <p style="color: rgba(255, 255, 255, 0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0;">
              Notificación de Nuevo Onboarding
            </p>
          </div>
          
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
            <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8);">
              ¡Excelente noticia! Un nuevo miembro del equipo ha completado exitosamente su experiencia de unboxing y onboarding.
            </p>
            
            <!-- Contractor Info -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #f59e0b; margin-top: 0; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 8px;">
                Ficha del Contratista
              </h3>
              
              <table style="width: 100%; border-collapse: collapse; color: #ffffff;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 35%; color: rgba(255, 255, 255, 0.6); font-size: 14px;">Nombre completo:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500;">${contractorName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: rgba(255, 255, 255, 0.6); font-size: 14px;">Fecha completado:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500;">${completedAt}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: rgba(255, 255, 255, 0.6); font-size: 14px; vertical-align: top;">Huella/Pilares:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500; color: #a78bfa;">${parsedPillars}</td>
                </tr>
              </table>
            </div>

            <!-- Expectations Section -->
            <div style="background: rgba(124, 58, 237, 0.05); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 14px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #7c3aed; margin-top: 0; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
                🎙️ Mensaje & Expectativas
              </h3>
              <p style="font-size: 14.5px; line-height: 1.7; font-style: italic; color: rgba(255, 255, 255, 0.95); margin: 0;">
                "${voiceText || '(El contratista continuó sin dejar mensaje de voz)'}"
              </p>
            </div>
          </div>
          
          <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 25px; padding-top: 15px;">
            <p style="font-size: 11px; color: rgba(255, 255, 255, 0.25); margin: 0;">
              Este es un correo de notificación automático generado por Onboarding Contratistas de ELITE 24 STUDIO.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({ error: 'Error enviando el correo', details: error.message });
  }
}
