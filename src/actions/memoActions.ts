"use server";

import { google } from 'googleapis';

type MemoPayload = {
  url: string;
  path: string;
  text: string;
  createdAt: string;
};

export async function saveMemoToGoogleSheets(payload: MemoPayload) {
  // 1. 環境変数を一度定数に代入し、TypeScriptに「値が存在する」ことを確定させます
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyEnv = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  // 2. 必須データが1つでも欠けていたらエラーにしてブロック
  if (!clientEmail || !privateKeyEnv || !spreadsheetId) {
    console.error("環境変数が読み込まれていません！.env.localを確認してください。");
    return { success: false, message: 'サーバーの環境変数設定エラー' };
  }

  // 3. 秘密鍵の改行コードを正しく復元
  const privateKey = privateKeyEnv.split(String.raw`\n`).join('\n');

  try {
    // 🌟 4. 【修正ポイント】オブジェクト形式でパラメータを渡す（undefinedを使わない安全な書き方）
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 5. スプレッドシートへ送信
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId, // 変数に変更
      range: 'シート1!A:D', // ※スプレッドシートの左下のタブ名が「シート1」か「Sheet1」か確認してください
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [payload.url, payload.path, payload.text, payload.createdAt]
        ],
      },
    });

    return { success: true, message: 'スプレッドシートにメモを保存しました' };
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return { success: false, message: 'スプレッドシートへの保存に失敗しました' };
  }
}