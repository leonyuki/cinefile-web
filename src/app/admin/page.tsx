"use client";

import { useState, useEffect } from 'react';
import { createMicroCMSPost, getMemberData, getEventsList } from '../../actions/microcmsActions'; // 🌟 getEventsList を追加
import { FileText, Image as ImageIcon, Calendar, User, Loader2, MessageSquare, Briefcase, Film } from 'lucide-react'; // 🌟 Film を追加

type PostType = 'news' | 'blog' | 'events' | 'people';

// 追加：イベント一覧用の型
type EventOption = {
  id: string;
  title: string;
  year: number;
  city?: string;
};

export default function PostAdminPage() {
  const [postType, setPostType] = useState<PostType>('news');
  const [status, setStatus] = useState('');

  // PEOPLE用の状態管理
  const [selectedMember, setSelectedMember] = useState('katsuki');
  const [nameJa, setNameJa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [portfolioMd, setPortfolioMd] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  
  // 🌟 追加：イベント選択用の状態
  const [availableEvents, setAvailableEvents] = useState<EventOption[]>([]); // すべてのイベント
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]); // チェックされたイベントID

  const [isLoadingData, setIsLoadingData] = useState(false);

  // 初回レンダリング時（または管理画面を開いた時）に、選択肢となる全イベントを取得しておく
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEventsList();
      setAvailableEvents(events);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (postType === 'people') {
      const fetchData = async () => {
        setIsLoadingData(true);
        const data = await getMemberData(selectedMember);
        if (data) {
          setNameJa(data.nameJa);
          setNameEn(data.nameEn);
          setPosition(data.position);
          setDescription(data.description);
          setPortfolioMd(data.portfolioMd);
          setCurrentImageUrl(data.imageUrl);
          setSelectedEvents(data.participatedEvents); // 🌟 追加：既存の紐付けをセット
        }
        setIsLoadingData(false);
      };
      fetchData();
    }
  }, [postType, selectedMember]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('送信中...');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('postType', postType);

    const result = await createMicroCMSPost(formData);
    if (result.success) {
      setStatus('✅ ' + result.message);
      if (postType !== 'people') form.reset();
    } else {
      setStatus('❌ ' + result.message);
    }
  };

  // 🌟 追加：チェックボックスを操作したときの処理
  const handleEventCheck = (eventId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 bg-white">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <p className="text-[10px] tracking-widest text-gray-400 mb-2">DASHBOARD</p>
        <h1 className="text-2xl tracking-tight text-gray-900">CinéFile 専用管理ツール</h1>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 bg-gray-50 p-1.5 rounded-sm border border-gray-100">
        {(['news', 'blog', 'events', 'people'] as PostType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => { setPostType(type); setStatus(''); }}
            className={`flex-1 min-w-[80px] py-2.5 text-xs tracking-widest uppercase transition-all rounded-xs font-medium ${
              postType === type ? 'bg-white text-gray-900 shadow-xs border border-gray-100' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {postType === 'people' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">編集するメンバー</label>
              <select
                name="memberId"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer"
              >
                <option value="katsuki">洪 克樹 (Katsuki Kou)</option>
                <option value="miku">外村 未空 (Miku Sotomura)</option>
                <option value="mirika">石田 満理佳 (Mirika Ishida)</option>
                <option value="sakamoto">坂本 (Sakamoto)</option>
                <option value="mizuha">大井 みずは (Mizuha Oi)</option>
                <option value="kageyama">陰山 裕貴 (Yuki Kageyama)</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">名前（日本語表記）</label>
                <input type="text" name="nameJa" value={nameJa} onChange={(e) => setNameJa(e.target.value)} disabled={isLoadingData} required className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">名前（英語表記）</label>
                <input type="text" name="nameEn" value={nameEn} onChange={(e) => setNameEn(e.target.value)} disabled={isLoadingData} required className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> 役職 (POSITION)
              </label>
              <input type="text" name="position" value={position} onChange={(e) => setPosition(e.target.value)} disabled={isLoadingData} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
            </div>

            <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> プロフィール画像を変更
              </label>
              {currentImageUrl && (
                <div className="mb-4">
                  <p className="text-[9px] text-gray-400 mb-1.5">現在の画像:</p>
                  <img src={currentImageUrl} alt="Preview" className="h-24 w-auto object-cover rounded-sm border border-gray-200" />
                </div>
              )}
              <input type="file" name="image" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer" />
            </div>
            
            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> ABOUT用 自己紹介（100文字程度）
              </label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoadingData} rows={3} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed" />
            </div>

            {/* 🌟 追加：参加イベントを選択できるスクロールエリア */}
            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" /> 参加・担当したイベント (複数選択可)
              </label>
              <div className="border border-gray-200 rounded-sm p-4 max-h-48 overflow-y-auto space-y-3 bg-white">
                {availableEvents.length > 0 ? (
                  availableEvents.map(event => (
                    <label key={event.id} className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={(e) => handleEventCheck(event.id, e.target.checked)}
                        disabled={isLoadingData}
                        className="mt-1 rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 group-hover:text-gray-500 transition-colors">{event.title}</span>
                        <span className="text-[10px] text-gray-400 tracking-wider uppercase">{event.year} | {event.city}</span>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">イベントデータがありません</p>
                )}
              </div>
              {/* 選択された配列データをサーバーに渡すための隠しフィールド */}
              <input type="hidden" name="participatedEvents" value={JSON.stringify(selectedEvents)} />
            </div>

            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Markdown ポートフォリオ本文
                {isLoadingData && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 ml-2" />}
              </label>
              <textarea name="portfolioMd" value={portfolioMd} onChange={(e) => setPortfolioMd(e.target.value)} disabled={isLoadingData} required rows={15} className="w-full border border-gray-200 p-4 text-sm font-mono text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed" />
            </div>
          </div>
        ) : (
          /* NEWS / BLOG / EVENTS 用の通常の入力エリア (変更なし) */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
                <input type="text" name="title" required className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder={`${postType === 'events' ? 'イベント名を入力' : '記事のタイトルを入力'}`} />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">{postType === 'events' ? 'サブタイトル / 英題' : 'カテゴリ'}</label>
                <input type="text" name={postType === 'events' ? 'subtitle' : 'category'} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
              </div>
            </div>

            {(postType === 'blog' || postType === 'events') && (
              <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> メイン画像 / アイキャッチ</label>
                <input type="file" name="image" accept="image/*" required={postType === 'events'} className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer" />
              </div>
            )}

            {postType === 'events' && (
              <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
                <p className="text-xs font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> イベント詳細メタデータ</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催年（数値）</label><input type="number" name="year" defaultValue={new Date().getFullYear()} required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">都市名（英語表記）</label><input type="text" name="city" placeholder="例: Tokyo, Copenhagen" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催期間（表示用テキスト）</label><input type="text" name="date" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">具体的な開催場所</label><input type="text" name="location" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">ステータス</label>
                  <select name="status" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer">
                    <option value="Past">Past (過去のイベントに配置)</option>
                    <option value="Upcoming">Upcoming (次回予告に配置)</option>
                  </select>
                </div>
              </div>
            )}

            {postType !== 'events' && (
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">記事の抜粋・概要</label>
                <input type="text" name="excerpt" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="一覧画面に表示される1行の紹介文" />
              </div>
            )}

            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 本文 / 説明文</label>
              <textarea name={postType === 'events' ? 'description' : 'content'} required rows={12} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed" placeholder={postType === 'events' ? 'イベントの解説文を入力してください...' : 'ここに本文を入力してください...'} />
            </div>
          </div>
        )}

        <button type="submit" className="w-full py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold mt-8">
          {postType === 'people' ? 'ポートフォリオを更新する' : `${postType} として登録・投稿する`}
        </button>

        {status && <div className="text-sm font-medium mt-6 text-center bg-gray-50 py-3 border border-gray-100 rounded-sm animate-pulse">{status}</div>}
      </form>
    </div>
  );
}