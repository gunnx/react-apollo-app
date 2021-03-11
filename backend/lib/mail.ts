import {
  createTransport,
  getTestMessageUrl,
  SentMessageInfo,
  TransportOptions,
} from 'nodemailer';
import 'dotenv/config';

// const mailUrl = `smtps://${process.env.MAIL_USER}:${process.env.MAIL_PASS}@${process.env.MAIL_HOST}`;

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as TransportOptions);

function createEmail(title: string, text: string) {
  return `
    <div style="border:1px solid black;padding:20px;font-family:sans-serif;line-height:2;font-size:20px;">
      <h2>Sick Fits</h2>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info: SentMessageInfo = await transport.sendMail({
    to,
    from: 'info@sickfits.com',
    subject: 'Your password reset token',
    html: createEmail(
      'Password Reset',
      `Here is your password reset link, click within 10 minutes.
      
      <a href="${process.env.FRONTEND_URL}/?token=${resetToken}">Reset link</a>`
    ),
  });

  if (process.env.MAIL_USER.endsWith('ethereal.email')) {
    const previewUrl = getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉️ Message sent. Preview at ${previewUrl}`);
    } else {
      console.log('Failed to generate preview email');
    }
  }
}
