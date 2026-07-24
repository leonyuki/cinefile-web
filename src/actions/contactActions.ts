"use server";

import nodemailer from 'nodemailer';

export async function sendInquiryEmail(formData: FormData) {
  const inquiryType = formData.get('inquiryType') as string;
  const name = formData.get('name') as string;
  const affiliation = formData.get('affiliation') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 独自のSMTPサーバー設定（環境変数から読み込み）
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // 1. 運営側（cinefile@cinefile.jp）への通知メール
    await transporter.sendMail({
      // ⚠️ 迷惑メール判定を避けるため、Fromは必ず自社ドメイン（no-reply）にします
      from: `"CinéFile お問い合わせフォーム" <no-reply@cinefile.jp>`,
      to: 'cinefile@cinefile.jp', // 運営の受信先
      replyTo: email, // これを設定することで、メールソフトで「返信」を押した際にお客様宛になります
      subject: `[CinéFile お問い合わせ] ${inquiryType}`,
      text: `Webサイトから新しいお問い合わせがありました。\n\nご用件：${inquiryType}\nお名前：${name}\nご所属：${affiliation}\nメールアドレス：${email}\n\nお問い合わせ内容：\n${message}`,
    });

    // 2. お客様への自動返信メール
    await transporter.sendMail({
      from: '"CinéFile" <no-reply@cinefile.jp>', // お客様に表示される送信元
      to: email, // お客様のメールアドレス
      subject: `【CinéFile】お問い合わせ受付完了のお知らせ`,
      text: `${name} 様\n\nこの度はお問い合わせいただきありがとうございます。\n以下の内容で受付いたしました。\n\n------------------------\nご用件：${inquiryType}\nお問い合わせ内容：\n${message}\n------------------------\n\n内容を確認の上、担当者より折り返しご連絡いたします。\n\n※このメールは送信専用アドレス（no-reply@cinefile.jp）から自動送信されています。\nご返信いただいてもお答えできませんのでご了承ください。`,
    });

    return { success: true, message: 'お問い合わせを送信しました。自動返信メールをご確認ください。' };
  } catch (error) {
    console.error('メール送信エラー:', error);
    return { success: false, message: '送信に失敗しました。時間をおいて再度お試しください。' };
  }
}