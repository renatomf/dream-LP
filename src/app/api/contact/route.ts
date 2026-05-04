import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nome, email, telefone, mensagem } = await req.json();

  if (!nome || !email || !mensagem) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
  }

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>body,table,td,p{font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif!important;}</style>
      </head>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

                <!-- HEADER — logo + wordmark -->
                <tr>
                  <td style="background:#111111;border-bottom:1px solid #FF2A35;padding:36px 40px 28px;text-align:center;">
                    <!-- Wordmark -->
                    <p style="margin:0 0 4px;font-size:42px;font-weight:700;color:#ffffff;letter-spacing:-2px;line-height:1;">dream</p>
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:5px;text-transform:uppercase;">Comunicação e Eventos</p>
                  </td>
                </tr>

                <!-- LABEL — novo contato -->
                <tr>
                  <td style="background:#FF2A35;padding:10px 40px;">
                    <p style="margin:0;font-size:10px;color:#fff;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Novo contato recebido</p>
                  </td>
                </tr>

                <!-- BODY -->
                <tr>
                  <td style="background:#111111;padding:36px 40px 32px;">

                    <!-- Nome -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:1px;">
                      <tr>
                        <td style="border-bottom:1px solid #1e1e1e;padding:18px 0 14px;">
                          <p style="margin:0 0 6px;font-size:9px;color:#FF2A35;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Nome</p>
                          <p style="margin:0;font-size:16px;color:#ffffff;font-weight:400;">${nome}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- E-mail -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:1px;">
                      <tr>
                        <td style="border-bottom:1px solid #1e1e1e;padding:18px 0 14px;">
                          <p style="margin:0 0 6px;font-size:9px;color:#FF2A35;letter-spacing:4px;text-transform:uppercase;font-weight:600;">E-mail</p>
                          <p style="margin:0;font-size:16px;color:#ffffff;font-weight:400;">${email}</p>
                        </td>
                      </tr>
                    </table>

                    ${telefone ? `
                    <!-- Telefone -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:1px;">
                      <tr>
                        <td style="border-bottom:1px solid #1e1e1e;padding:18px 0 14px;">
                          <p style="margin:0 0 6px;font-size:9px;color:#FF2A35;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Telefone</p>
                          <p style="margin:0;font-size:16px;color:#ffffff;font-weight:400;">${telefone}</p>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Mensagem -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
                      <tr>
                        <td style="padding:18px 0 0;">
                          <p style="margin:0 0 12px;font-size:9px;color:#FF2A35;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Mensagem</p>
                          <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.75);line-height:1.8;white-space:pre-line;">${mensagem}</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background:#0a0a0a;border-top:1px solid #1a1a1a;padding:24px 40px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:10px;color:#FF2A35;letter-spacing:3px;text-transform:uppercase;">dream</p>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">contato@dreameventos.com.br &nbsp;|&nbsp; +55 11 94743 5658</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const { error } = await resend.emails.send({
    from: 'Site Dream <contato@dreameventos.com.br>',
    to: ['contato@dreameventos.com.br'],
    subject: `Novo contato de ${nome}`,
    html,
    text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\n\n${mensagem}`,
  });

  if (error) {
    console.error('[Resend error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
