"use client";

import { useState, useEffect } from 'react';
import { FileText, Image as ImageIcon, Calendar, Building2, PlusCircle, Edit3, Loader2, Eye, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getEventDetail, createMicroCMSPost } from '../../actions/microcmsActions';

type PartnerOption = {
  id: string;
  name: string;
};

type EventOption = {
  id: string;
  title: string;
  year: number;
  city?: string;
};

type Props = {
  availableEvents: EventOption[];
  availablePartners: PartnerOption[];
  refreshMasterData: () => Promise<void>;
};

export default function EventsTab({ availableEvents, availablePartners, refreshMasterData }: Props) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  // 🌟 追加：確認画面モードのステート
  const [isConfirming, setIsConfirming] = useState(false);

  // フォーム状態
  const [eventMode, setEventMode] = useState<'create' | 'edit'>('create');
  const [selectedEditEventId, setSelectedEditEventId] = useState('');
  
  const [eventTitle, setEventTitle] = useState('');
  const [eventSubtitle, setEventSubtitle] = useState('');
  const [eventYear, setEventYear] = useState<number | string>(new Date().getFullYear());
  const [eventCity, setEventCity] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStatus, setEventStatus] = useState('Past');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCurrentImageUrl, setEventCurrentImageUrl] = useState('');

  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([]);
  const [selectedCooperations, setSelectedCooperations] = useState<string[]>([]);
  const [selectedSponsorships, setSelectedSponsorships] = useState<string[]>([]);
  const [selectedCrowdfundings, setSelectedCrowdfundings] = useState<string[]>([]);

  const resetEventForm = () => {
    setEventTitle('');
    setEventSubtitle('');
    setEventYear(new Date().getFullYear());
    setEventCity('');
    setEventDate('');
    setEventLocation('');
    setEventStatus('Past');
    setEventDescription('');
    setEventCurrentImageUrl('');
    setSelectedOrganizers([]);
    setSelectedCooperations([]);
    setSelectedSponsorships([]);
    setSelectedCrowdfundings([]);
    setIsConfirming(false); // リセット時にも確認状態を解除
  };

  // 編集モード切替時のデータ取得
  useEffect(() => {
    if (eventMode === 'edit' && selectedEditEventId) {
      const fetchEventDetail = async () => {
        setIsLoadingData(true);
        const data = await getEventDetail(selectedEditEventId);
        if (data) {
          setEventTitle(data.title);
          setEventSubtitle(data.subtitle);
          setEventYear(data.year);
          setEventCity(data.city);
          setEventDate(data.date);
          setEventLocation(data.location);
          setEventStatus(data.status);
          setEventDescription(data.description);
          setEventCurrentImageUrl(data.imageUrl);
          setSelectedOrganizers(data.organizer || []);
          setSelectedCooperations(data.cooperation || []);
          setSelectedSponsorships(data.sponsorship || []);
          setSelectedCrowdfundings(data.crowdfunding || []);
        }
        setIsLoadingData(false);
      };
      fetchEventDetail();
    } else if (eventMode === 'create') {
      resetEventForm();
    }
  }, [eventMode, selectedEditEventId]);

  const handlePartnerCheck = (partnerId: string, isChecked: boolean, currentList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (isChecked) {
      setList([...currentList, partnerId]);
    } else {
      setList(currentList.filter(id => id !== partnerId));
    }
  };

  const renderPartnerSelector = (label: string, selectedList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, fieldName: string) => (
    <div className={`space-y-2 transition-opacity ${isConfirming ? 'opacity-60 pointer-events-none' : ''}`}>
      <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">{label} (複数選択可)</label>
      <div className={`border rounded-sm p-3 max-h-32 overflow-y-auto space-y-2 ${isConfirming ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
        {availablePartners.length > 0 ? (
          availablePartners.map(partner => (
            <label key={partner.id} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox"
                checked={selectedList.includes(partner.id)}
                onChange={(e) => handlePartnerCheck(partner.id, e.target.checked, selectedList, setList)}
                disabled={isConfirming}
                className="rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900 disabled:opacity-50"
              />
              <span className={`text-xs font-medium transition-colors ${isConfirming ? 'text-gray-500' : 'text-gray-800 group-hover:text-gray-500'}`}>{partner.name}</span>
            </label>
          ))
        ) : (
          <p className="text-[10px] text-gray-400">パートナーデータがありません</p>
        )}
      </div>
      <input type="hidden" name={fieldName} value={JSON.stringify(selectedList)} />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🌟 1段階目：まだ確認モードでなければ、確認モードに切り替えて終了
    if (!isConfirming) {
      setIsConfirming(true);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 画面上部へスクロール
      return;
    }

    // 🌟 2段階目：確認モードで「送信」を押されたら実際のアップロード処理へ
    setIsLoading(true);
    setStatus('送信中...');
    
    const formData = new FormData(e.currentTarget);
    formData.append('postType', 'events');
    
    if (eventMode === 'edit') {
      formData.append('eventId', selectedEditEventId);
    }

    const result = await createMicroCMSPost(formData);
    if (result.success) {
      setStatus('✅ ' + result.message);
      await refreshMasterData();
      if (eventMode === 'create') {
        resetEventForm();
        e.currentTarget.reset();
      } else {
        setIsConfirming(false); // 編集完了時は確認モードを解除
      }
    } else {
      setStatus('❌ ' + result.message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      <div className="flex gap-4 border-b border-gray-100 pb-4">
        <button
          type="button"
          onClick={() => { setEventMode('create'); setStatus(''); setIsConfirming(false); }}
          className={`flex items-center gap-1.5 text-xs tracking-widest font-medium py-1.5 px-3 rounded-xs transition-colors ${
            eventMode === 'create' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" /> 新規イベント登録
        </button>
        <button
          type="button"
          onClick={() => { setEventMode('edit'); setStatus(''); setIsConfirming(false); }}
          className={`flex items-center gap-1.5 text-xs tracking-widest font-medium py-1.5 px-3 rounded-xs transition-colors ${
            eventMode === 'edit' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> 既存イベントの修正
        </button>
      </div>

      {eventMode === 'edit' && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">修正する過去・最新イベントを選択</label>
          <select
            value={selectedEditEventId || ''}
            onChange={(e) => {
              setSelectedEditEventId(e.target.value);
              setIsConfirming(false);
            }}
            required
            disabled={isConfirming}
            className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900 cursor-pointer'}`}
          >
            <option value="">-- 修正するイベントを選択してください --</option>
            {availableEvents.map(event => (
              <option key={event.id} value={event.id}>
                [{event.year}] {event.title} ({event.city || '拠点未定'})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 🌟 確認画面中のアラート表示 */}
      {isConfirming && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">入力内容の確認</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              以下の内容で登録・更新します。よろしければページ下部の「この内容で送信する」ボタンを押してください。<br/>
              修正する場合は「修正する」ボタンを押してください。
            </p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
          <input 
            type="text" 
            name="title" 
            value={eventTitle || ''} 
            onChange={(e) => setEventTitle(e.target.value)} 
            disabled={isLoadingData} 
            readOnly={isConfirming}
            required 
            className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`} 
            placeholder="イベント名を入力" 
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">サブタイトル / 英題</label>
          <input 
            type="text" 
            name="subtitle" 
            value={eventSubtitle || ''} 
            onChange={(e) => setEventSubtitle(e.target.value)} 
            disabled={isLoadingData} 
            readOnly={isConfirming}
            className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`} 
          />
        </div>
      </div>

      <div className={`p-5 border border-dashed rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-200 opacity-80 pointer-events-none' : 'bg-gray-50 border-gray-300'}`}>
        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> ポスターアート</label>
        {eventMode === 'edit' && eventCurrentImageUrl && (
          <div className="mb-4">
            <p className="text-[9px] text-gray-400 mb-1.5">現在のポスターアート:</p>
            <img src={eventCurrentImageUrl} alt="Poster" className="h-28 w-auto object-contain bg-black/5 rounded-sm border border-gray-200" />
          </div>
        )}
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          required={eventMode === 'create'} 
          disabled={isConfirming}
          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer disabled:opacity-50" 
        />
        {isConfirming && <p className="text-[10px] text-gray-400 mt-2">※画像は選択済みのものがアップロードされます。</p>}
      </div>

      <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
        <p className="text-xs font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> イベント詳細メタデータ</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催年（数値）</label>
            <input 
              type="number" 
              name="year" 
              value={eventYear || ''} 
              onChange={(e) => setEventYear(Number(e.target.value))} 
              disabled={isLoadingData} 
              readOnly={isConfirming}
              required 
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900'}`} 
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">都市名（英語表記）</label>
            <input 
              type="text" 
              name="city" 
              value={eventCity || ''} 
              onChange={(e) => setEventCity(e.target.value)} 
              disabled={isLoadingData} 
              readOnly={isConfirming}
              placeholder="例: Tokyo, Copenhagen" 
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900'}`} 
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催期間（表示用テキスト）</label>
            <input 
              type="text" 
              name="date" 
              value={eventDate || ''} 
              onChange={(e) => setEventDate(e.target.value)} 
              disabled={isLoadingData} 
              readOnly={isConfirming}
              required 
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900'}`} 
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">具体的な開催場所</label>
            <input 
              type="text" 
              name="location" 
              value={eventLocation || ''} 
              onChange={(e) => setEventLocation(e.target.value)} 
              disabled={isLoadingData} 
              readOnly={isConfirming}
              required 
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900'}`} 
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">ステータス</label>
          <select 
            name="status" 
            value={eventStatus || 'Past'} 
            onChange={(e) => setEventStatus(e.target.value)} 
            disabled={isLoadingData || isConfirming} 
            className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'bg-white border-gray-200 focus:border-gray-900 cursor-pointer'}`}
          >
            <option value="Past">Past (過去のイベントに配置)</option>
            <option value="Upcoming">Upcoming (次回予告に配置)</option>
          </select>
        </div>
      </div>

      <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
        <p className="text-xs font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> 協力・パートナー設定 (任意)</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {renderPartnerSelector('主催 (Organizer)', selectedOrganizers, setSelectedOrganizers, 'organizer')}
          {renderPartnerSelector('協力 (Cooperation)', selectedCooperations, setSelectedCooperations, 'cooperation')}
          {renderPartnerSelector('協賛 (Sponsorship)', selectedSponsorships, setSelectedSponsorships, 'sponsorship')}
          {renderPartnerSelector('クラウドファンディング (Crowdfunding)', selectedCrowdfundings, setSelectedCrowdfundings, 'crowdfunding')}
        </div>
      </div>

      {/* エディタセクション */}
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Markdown イベント概要本文 (Description)
          </label>
          <textarea 
            name="description" 
            value={eventDescription || ''} 
            onChange={(e) => setEventDescription(e.target.value)} 
            disabled={isLoadingData} 
            readOnly={isConfirming}
            required 
            rows={15} 
            className={`w-full border p-4 text-sm font-mono focus:outline-none rounded-sm transition-colors resize-y leading-relaxed ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 bg-[#faf9f7] focus:bg-white focus:border-gray-900'}`} 
            placeholder="ここにMarkdown形式でイベントの詳細を記述してください。&#13;&#10;&#13;&#10;## 開催概要&#13;&#10;本文テキスト..." 
          />
        </div>

        {/* リアルタイムプレビュー領域 */}
        {eventDescription && (
          <div className="p-6 border border-gray-100 bg-white rounded-sm space-y-4 animate-in fade-in duration-200 shadow-3xs">
            <p className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <Eye className="w-3.5 h-3.5 text-gray-500" /> リアルタイムプレビュー (Live Preview)
            </p>
            <div className="
              text-sm text-gray-600 leading-relaxed max-w-none pt-2
              [&>h1]:hidden
              [&>p:first-of-type]:text-base [&>p:first-of-type]:leading-loose [&>p:first-of-type]:mb-8
              [&>h2]:text-xs [&>h2]:tracking-widest [&>h2]:text-gray-400 [&>h2]:uppercase [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-100
              [&>h3]:text-sm [&>h3]:tracking-tight [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-1 [&>h3]:font-semibold
              [&>p]:mb-4
              [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-gray-500
              [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol]:ml-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:text-gray-500
              [&>ul>li>strong]:font-semibold [&>ul>li>strong]:text-gray-800
              [&>hr]:my-10 [&>hr]:border-gray-100
              [&>blockquote]:bg-[#faf9f7] [&>blockquote]:p-5 [&>blockquote]:rounded-sm [&>blockquote]:border-l-2 [&>blockquote]:border-[#1c2b5e] [&>blockquote]:text-gray-700 [&>blockquote]:italic [&>blockquote]:leading-loose
            ">
              <ReactMarkdown>{eventDescription}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* 🌟 ボタンエリアの切り替え */}
      {!isConfirming ? (
        <button 
          type="submit" 
          disabled={isLoading || isLoadingData}
          className="w-full py-4 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold disabled:opacity-50"
        >
          {isLoadingData ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : '入力内容を確認する'}
        </button>
      ) : (
        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
          <button 
            type="button" 
            onClick={() => setIsConfirming(false)}
            disabled={isLoading}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-sm font-semibold disabled:opacity-50"
          >
            修正する
          </button>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="flex-1 py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> 送信中...
              </>
            ) : (
              eventMode === 'edit' ? 'この内容でイベント情報を修正する' : 'この内容で events として登録する'
            )}
          </button>
        </div>
      )}

      {status && (
        <div className={`text-sm font-medium mt-6 text-center py-3 border rounded-sm ${status.includes('❌') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
          {status}
        </div>
      )}
    </form>
  );
}