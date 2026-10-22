import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const DESTINATION_EMAIL = process.env.CONTACT_TO_EMAIL || 'ceibosoftware.ar@gmail.com'
const SMTP_USER = process.env.SMTP_USER || 'ceibosoftware.ar@gmail.com'
const SMTP_PASS = process.env.SMTP_PASS

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, budget, message } = body

    // Validaciones basicas
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Por favor ingresa tu nombre.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Por favor ingresa un email valido.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Por favor ingresa tu mensaje o consulta.' }, { status: 400 })
    }

    if (!SMTP_PASS) {
      console.error(
        '[Contact API] Advertencia: Variable SMTP_PASS no configurada. Revisa .env.local'
      )
      return NextResponse.json(
        {
          error:
            'El servicio de correo esta en configuracion (falta SMTP_PASS). Por favor escribenos por WhatsApp o a ceibosoftware.ar@gmail.com',
        },
        { status: 500 }
      )
    }

    // Configurar transporte Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const cleanPhone = phone?.trim() || ''
    const cleanCompany = company?.trim() || 'No especificada'
    const cleanBudget = budget?.trim() || 'No especificado'
    const cleanMessage = message.trim()

    const digitsOnly = cleanPhone.replace(/\D/g, '')
    const whatsappUrl = digitsOnly.length >= 8 ? `https://wa.me/${digitsOnly}` : null

    const textContent = `
NUEVO CONTACTO DESDE LA WEB - CEIBO SOFTWARE
--------------------------------------------------
Nombre:   ${name.trim()}
Email:    ${email.trim()}
Telefono: ${cleanPhone || 'No proporcionado'}
Empresa:  ${cleanCompany}
Presupuesto estimado: ${cleanBudget}

Mensaje:
${cleanMessage}
--------------------------------------------------
`

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje desde Ceibo Software</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #111116; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header with Brand Accent -->
          <tr>
            <td style="background: linear-gradient(135deg, #18181b 0%, #1f1118 100%); padding: 28px 32px; border-bottom: 2px solid #e11d48;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Ceibo<span style="color: #f43f5e;">.</span>software
                    </span>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #fb7185; margin-top: 4px; font-weight: 600;">
                      Nuevo Prospecto Web
                    </span>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(225, 29, 72, 0.15); border: 1px solid rgba(225, 29, 72, 0.4); color: #f43f5e; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">
                      Formulario Web
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 15px; color: #d4d4d8; margin: 0 0 24px 0; line-height: 1.5;">
                Has recibido una nueva consulta de proyecto a traves del sitio web oficial:
              </p>

              <!-- Data Grid -->
              <table role="presentation" width="100%" style="background-color: #181820; border-radius: 12px; border: 1px solid #27272a; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; width: 35%; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    Nombre
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 14px; font-weight: 700; color: #ffffff;">
                    ${name.trim()}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    Email
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 14px; font-weight: 600;">
                    <a href="mailto:${email.trim()}" style="color: #fb7185; text-decoration: none;">
                      ${email.trim()}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    Celular / WhatsApp
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 14px; color: #ffffff;">
                    ${
                      cleanPhone
                        ? `<a href="tel:${cleanPhone}" style="color: #ffffff; text-decoration: underline; font-weight: 600;">${cleanPhone}</a>` +
                          (whatsappUrl
                            ? ` &nbsp;&middot;&nbsp; <a href="${whatsappUrl}" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-decoration: none;">WhatsApp &rarr;</a>`
                            : '')
                        : '<span style="color: #71717a; font-style: italic;">No proporcionado</span>'
                    }
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    Empresa / Startup
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #27272a; font-size: 14px; color: #ffffff;">
                    ${cleanCompany}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    Inversion Estimada
                  </td>
                  <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #34d399;">
                    ${cleanBudget}
                  </td>
                </tr>
              </table>

              <!-- Message Block -->
              <div style="margin-bottom: 28px;">
                <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #a1a1aa; font-weight: 700; margin-bottom: 8px;">
                  Mensaje o Alcance:
                </span>
                <div style="background-color: #0c0c11; border: 1px solid #27272a; border-left: 3px solid #e11d48; padding: 18px; border-radius: 8px; color: #f4f4f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</div>
              </div>

              <!-- Quick Action Button -->
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${email.trim()}?subject=Re:%20Contacto%20Ceibo%20Software" style="display: inline-block; background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 50px; box-shadow: 0 4px 20px rgba(225, 29, 72, 0.4);">
                      Responder directamente a ${name.trim()} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #09090b; padding: 20px 32px; border-top: 1px solid #27272a; text-align: center;">
              <p style="font-size: 11px; color: #71717a; margin: 0; line-height: 1.4;">
                Este correo fue generado automaticamente por el formulario de contacto de <strong style="color: #a1a1aa;">ceibo.software</strong>.<br>
                Al responder este mail, el cliente recibira tu respuesta directamente en su casilla (${email.trim()}).
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    await transporter.sendMail({
      from: `"Ceibo Software Web" <${SMTP_USER}>`,
      to: DESTINATION_EMAIL,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `🔔 [Web] Nuevo contacto: ${name.trim()}${cleanCompany !== 'No especificada' ? ` · ${cleanCompany}` : ''}`,
      text: textContent,
      html: htmlContent,
    })

    return NextResponse.json({ success: true, message: 'Mensaje enviado con exito.' })
  } catch (error: any) {
    console.error('[Contact API] Error al enviar email:', error)
    return NextResponse.json(
      {
        error:
          'Ocurrio un error al enviar el mensaje. Por favor intenta nuevamente o contactanos directamente por WhatsApp.',
      },
      { status: 500 }
    )
  }
}
