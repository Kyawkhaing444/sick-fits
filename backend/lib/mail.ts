/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createTransport, getTestMessageUrl } from 'nodemailer';
import { accessEnv } from './accessEnv';

const targetURL = accessEnv({
  key: 'FRONTEND_URL',
  defaultValue: 'http://localhost:7777',
});

const mailUser = accessEnv({
  key: 'MAIL_USER',
});

const transporter = createTransport({
  host: accessEnv({ key: 'MAIL_HOST' }),
  port: parseInt(accessEnv({ key: 'MAIL_PORT' })),
  auth: {
    user: mailUser,
    pass: accessEnv({ key: 'MAIL_PASS' }),
  },
});

const makeNiceEmail = (text: string): string => `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, Yours truly</p>
    </div>
  `;

interface IParaType {
  resetToken: string;
  to: string;
}

export const sendPasswordResetEmail = async ({
  resetToken,
  to,
}: IParaType): Promise<void> => {
  const info = await transporter.sendMail({
    to,
    from: 'example@gmail.com',
    subject: 'Your Password reset token!',
    html: makeNiceEmail(`Your Password Reset Token is here!
      <a href="${targetURL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  });
  if (info && mailUser.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
};
