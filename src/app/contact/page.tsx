"use client";

import { useState } from 'react';
import { sendInquiryEmail } from '../../actions/contactActions';
import { Loader2 } from 'lucide-react';

const INQUIRY_TYPES = [
  'イベント・プロジェクトに関するお問い合わせ',
  '協賛・スポンサーに関するお問い合わせ',
  'メディア・取材に関するお問い合わせ',
  'その他',
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  
  const [form, setForm] = useState({
    inquiryType: '',
    name: '',
    affiliation: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData(e.currentTarget);
    const result = await sendInquiryEmail(formData);

    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setForm({ inquiryType: '', name: '', affiliation: '', email: '', message: '' });
    } else {
      setStatus({ type: 'error', message: result.message });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      
      {/* 🌟 上部：CinéFileを支えてくださる方へ（協賛・コラボレーション） */}
      <div className="mb-24 sm:mb-32">
        <div className="mb-14 max-w-3xl">
          <p className="text-[10px] tracking-widest text-gray-400 mb-3 uppercase font-semibold">Sponsorship & Collaboration</p>
          <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900 mb-6">CinéFileを支えてくださる方へ</h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            私たちの活動は、法人・個人の皆さまのご支援で成り立っています。<br className="hidden sm:block" />
            協賛やパートナーシップは次のような形でご検討いただけるほか、アートコラボレーションや共同での映像制作に関するご相談も広く受け付けております。
          </p>
        </div>
      </div>

      {/* 美しい区切り線 */}
      <hr className="border-gray-100 mb-20" />

      {/* 🌟 下部：お問い合わせフォーム */}
      <div className="max-w-3xl">
        <div className="mb-14">
          <p className="text-[10px] tracking-widest text-gray-400 mb-3 uppercase font-semibold">Contact</p>
          <h2 className="text-2xl sm:text-3xl tracking-tight text-gray-900">お問い合わせ</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[11px] tracking-widest text-gray-500 mb-4 uppercase">
              ご用件 <span className="text-[#1c2b5e]">*</span>
            </label>
            <div className="space-y-3 bg-[#faf9f7] p-5 rounded-sm border border-gray-50">
              {INQUIRY_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="inquiryType"
                    value={type}
                    checked={form.inquiryType === type}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="accent-[#1c2b5e] w-4 h-4 shrink-0 bg-white border-gray-300 focus:ring-[#1c2b5e]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-widest text-gray-500 mb-2 uppercase">
              お名前 <span className="text-[#1c2b5e]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full bg-[#faf9f7] border border-transparent py-3.5 px-4 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-all rounded-sm disabled:opacity-50"
              placeholder="山田 花子"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-widest text-gray-500 mb-2 uppercase">ご所属</label>
            <input
              type="text"
              name="affiliation"
              value={form.affiliation}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-[#faf9f7] border border-transparent py-3.5 px-4 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-all rounded-sm disabled:opacity-50"
              placeholder="○○大学 / ○○株式会社"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-widest text-gray-500 mb-2 uppercase">
              メールアドレス <span className="text-[#1c2b5e]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full bg-[#faf9f7] border border-transparent py-3.5 px-4 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-all rounded-sm disabled:opacity-50"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-widest text-gray-500 mb-2 uppercase">
              お問い合わせ内容 <span className="text-[#1c2b5e]">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={6}
              className="w-full bg-[#faf9f7] border border-transparent p-4 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-all resize-none rounded-sm disabled:opacity-50"
              placeholder="お問い合わせ内容をご記入ください。"
            />
          </div>

          <div className="pt-4">
            <p className="text-[10px] text-gray-400 mb-6 tracking-wider">
              <span className="text-[#1c2b5e]">*</span> は必須項目です。<br/>送信できない場合は、お手数ですがcinefile@cinefile.jpへ直接ご連絡ください。
            </p>
            
            {status.message && (
              <div className={`mb-6 p-4 text-sm rounded-sm ${status.type === 'success' ? 'bg-[#faf9f7] border border-gray-200 text-gray-800' : 'bg-red-50 text-red-600'}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 bg-[#1c2b5e] text-white text-xs tracking-widest hover:bg-[#152248] transition-colors disabled:opacity-70 flex items-center justify-center rounded-sm font-medium"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 送信中...</>
              ) : (
                '送信する'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}