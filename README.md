# CinéFile Web

国境を越えた学生主導のアート・カルチャープロジェクト「CinéFile」の公式サイトです。
Next.js（App Router）+ microCMS + Supabase で構築されており、Vercel（本番: https://cinefile.jp）にデプロイされています。

## ⚠️ 開発前に必ず読むこと

このリポジトリは **Next.js 16.2.7** を使用しています。破壊的変更が多く含まれるバージョンのため、コードを書く前に `node_modules/next/dist/docs/` 配下の該当ガイドを確認してください（詳細は `AGENTS.md` を参照）。特に注意すべき点:

- ミドルウェアは廃止され、`middleware.ts` ではなく **`src/proxy.ts`**（`proxy` 関数）を使用します。
- `next/image` の `priority` は非推奨で、代わりに **`preload`** を使用します。
- 画像最適化には `next.config.ts` の `images.qualities`（Next 16から必須）や `remotePatterns` が必要です。

## 技術スタック

- **フレームワーク**: Next.js 16（App Router, Turbopack）/ React 19 / TypeScript
- **スタイリング**: Tailwind CSS v4
- **CMS**: [microCMS](https://microcms.io/)（お知らせ・ブログ・メンバー・パートナー情報）
- **認証・アカウント管理**: [Supabase](https://supabase.com/)（管理画面のユーザーアカウント）
- **メール送信**: Nodemailer（お問い合わせフォーム）
- **その他**: `jose`（セッション署名）、`react-markdown`、`react-social-media-embed`
- **ホスティング**: Vercel

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

### 環境変数

`.env.local` に以下を設定してください（値は各サービスの管理画面から取得。リポジトリには含まれません）。

| 用途 | 変数名 |
|---|---|
| Supabase（管理画面アカウント） | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| microCMS（コンテンツ） | `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY` |
| セッション署名 | `AUTH_SECRET`（ログインセッションのJWT署名に使用。十分に長いランダム文字列を設定） |
| お問い合わせメール送信（SMTP） | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` |

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番ビルドの起動 |
| `npm run lint` | ESLint実行 |

## ディレクトリ構成

```
src/
├── proxy.ts              # 管理画面(/admin)へのアクセス制御（Next.js 16のProxy）
├── actions/               # Server Actions（"use server"）
│   ├── authActions.ts     # ログイン・セッション取得
│   ├── supabaseActions.ts # 管理画面ユーザーのCRUD
│   ├── microcmsActions.ts # news/blog/people/partnersのCRUD
│   └── contactActions.ts  # お問い合わせメール送信
├── app/
│   ├── admin/             # 管理画面（内部向け、詳細は MANUAL.md 参照）
│   ├── archive/           # アーカイブ一覧 + イベント個別ページ（下記「コンテンツの管理」参照）
│   ├── about, media, people/[id], contact, privacy
│   ├── robots.ts, sitemap.ts
│   └── layout.tsx, page.tsx
├── components/            # UIコンポーネント（admin/, event/ サブフォルダあり）
├── libs/
│   ├── microcms.ts        # microCMSクライアント
│   ├── session.ts         # セッションの署名・検証（JWT）
│   ├── auth.ts             # 権限チェック（checkAccess）
│   └── password.ts         # パスワードのハッシュ化・検証
├── data/events.ts          # トップページ・アーカイブ一覧用のイベント概要データ
├── context/LanguageContext.tsx  # 日本語/英語切り替え
└── types/event.ts          # イベント関連の型定義
```

## コンテンツの管理方法

このサイトのコンテンツは2系統に分かれています。

1. **microCMSで管理するもの**（`/admin` 管理画面から編集）: お知らせ(news)、ブログ(blog)、メンバー(people)、パートナー(partners)、管理画面アカウント。使い方は **[MANUAL.md](./MANUAL.md)** を参照してください。
2. **コード内データで管理するもの**（Gitで編集してデプロイが必要）: 過去・今後のイベント情報。

    - `src/data/events.ts` … トップページのヒーロー画像やアーカイブ一覧に出る「概要」データ
    - `src/app/archive/{slug}/data.ts` … 各イベントの個別ページ（ステートメント、参加アーティスト、クレジット等）の本文データ

   ⚠️ **この2つは別ファイルです。** イベント一覧の表示だけでなく個別ページの内容も直したい場合は、両方を編集する必要があります。管理画面からは編集できません。

## 認証・権限

管理画面には3つの権限があります。

| 権限 | できること |
|---|---|
| `ADMIN` | すべての操作（アカウント管理を含む） |
| `PR` | news / blog / partners の投稿・編集 |
| `USER` | 自分自身のプロフィール（people）編集のみ |

- ログインセッションは署名付きJWT（`AUTH_SECRET`で署名、`src/libs/session.ts`）としてCookieに保存されます。
- パスワードはNode標準の`crypto.scrypt`でハッシュ化して保存されます（`src/libs/password.ts`）。
- 新規アカウントの発行はADMIN権限を持つユーザーのみが管理画面（Usersタブ）から行えます。セルフサインアップはありません。

管理画面の具体的な操作方法は **[MANUAL.md](./MANUAL.md)** を参照してください。

## デプロイ

Vercelにデプロイされています（本番: https://cinefile.jp）。`main`ブランチへのpushで自動デプロイされます。

- microCMSのコンテンツ取得は60秒のISR（`revalidate: 60`）でキャッシュしています。即時反映したい場合は最大60秒程度のタイムラグがあります。
- `robots.ts` / `sitemap.ts` により `/admin` 以下はクロール対象から除外されています。

