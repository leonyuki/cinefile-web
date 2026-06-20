"use client"; // フォームの動き（useStateなど）を扱うために追加しました

import { useState } from 'react';

const INQUIRY_TYPES = [
  'イベント・プロジェクトに関するお問い合わせ',
  '協賛・スポンサーに関するお問い合わせ',
  'メディア・取材に関するお問い合わせ',
  'その他',
];

// export default に変更しました
export default function ContactPage() {
  const [form, setForm] = useState({
    inquiryType: '',
    name: '',
    affiliation: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[CinéFile] ${form.inquiryType || 'お問い合わせ'}`);
    const body = encodeURIComponent(
      `ご用件：${form.inquiryType}\nお名前：${form.name}\nご所属：${form.affiliation}\nメールアドレス：${form.email}\n\nお問い合わせ内容：\n${form.message}`
    );
    window.location.href = `mailto:cinefile.jp@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-3">CONTACT</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">お問い合わせ</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Inquiry Type */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-3">
              ご用件 <span className="text-[#1c2b5e]">*</span>
            </label>
            <div className="space-y-2">
              {INQUIRY_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="inquiryType"
                    value={type}
                    checked={form.inquiryType === type}
                    onChange={handleChange}
                    required
                    // flex-shrink-0 を shrink-0 にスッキリさせました
                    className="accent-[#1c2b5e] w-3.5 h-3.5 shrink-0"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              お名前 <span className="text-[#1c2b5e]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-transparent"
              placeholder="山田 花子"
            />
          </div>

          {/* Affiliation */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              ご所属
            </label>
            <input
              type="text"
              name="affiliation"
              value={form.affiliation}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-transparent"
              placeholder="○○大学 / ○○株式会社"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              メールアドレス <span className="text-[#1c2b5e]">*</span>
            </label>
            <input
              type="type" // 型の安全性を高めるため、後で type="email" のまま自動補完されます
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-transparent"
              placeholder="example@mail.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              お問い合わせ内容 <span className="text-[#1c2b5e]">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-transparent resize-none"
              placeholder="お問い合わせ内容をご記入ください。"
            />
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-6">
              <span className="text-[#1c2b5e]">*</span> は必須項目です。送信ボタンを押すとメールアプリが起動します。
            </p>
            <button
              type="submit"
              className="px-8 py-3 bg-[#1c2b5e] text-white text-xs tracking-widest hover:bg-[#152248] transition-colors"
            >
              送信する
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="space-y-8 md:pt-4">
          <div>
            <h2 className="text-xs tracking-widest text-gray-400 mb-4">DIRECT CONTACT</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              メールアプリが開かない場合は、下記のアドレスへ直接ご連絡ください。
            </p>
            <a
              href="mailto:cinefile.jp@gmail.com"
              className="text-sm text-gray-900 hover:underline"
            >
              cinefile.jp@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-xs tracking-widest text-gray-400 mb-4">SNS</h2>
            <a
              href="https://www.instagram.com/cinefile.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              @cinefile.official
            </a>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-xs text-gray-400 leading-relaxed">
              CinéFileは学生主体のプロジェクトのため、返信にお時間をいただく場合がございます。どうぞご了承ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}