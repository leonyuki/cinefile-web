"use client";

import { useState, useEffect } from 'react';
import { Image as ImageIcon, MessageSquare, Film, User, Loader2 } from 'lucide-react';
import { getMemberData, createMicroCMSPost } from '../../actions/microcmsActions';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.73 16h4.27L8.27 4H4z" />
    <path d="M20 4L4.3 20" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const OtherLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

type Props = {
  availableMembers: any[];
  availableEvents: any[];
  refreshMasterData: () => Promise<void>;
  currentUser: any; 
};

export default function PeopleTab({ availableMembers, availableEvents, refreshMasterData, currentUser }: Props) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const userRole = currentUser?.role?.toUpperCase() || 'USER';
  const isAdmin = userRole === 'ADMIN';

  const supabaseUserId = String(currentUser?.user_id || '').trim();

  const allowedMembers = isAdmin 
    ? availableMembers
    : availableMembers.filter(member => {
        const microCmsName = String(member.name || '').trim();
        return microCmsName === supabaseUserId && supabaseUserId !== '';
      });

  const [selectedMember, setSelectedMember] = useState('');
  const [nameJa, setNameJa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [portfolioMd, setPortfolioMd] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [note, setNote] = useState('');
  const [website, setWebsite] = useState('');
  const [otherUrl, setOtherUrl] = useState('');

  useEffect(() => {
    if (allowedMembers.length > 0 && !selectedMember) {
      setSelectedMember(allowedMembers[0].name);
    }
  }, [allowedMembers]);

  useEffect(() => {
    if (selectedMember) {
      const fetchData = async () => {
        setIsLoadingData(true);
        const data = await getMemberData(selectedMember);
        if (data) {
          setNameJa(data.nameJa || '');
          setNameEn(data.nameEn || '');
          setPosition(data.position || '');
          setDescription(data.description || '');
          setPortfolioMd(data.portfolioMd || '');
          setCurrentImageUrl(data.imageUrl || '');
          setSelectedEvents(data.participatedEvents || []); 
          
          setInstagram(data.instagram || '');
          setTwitter(data.twitter || '');
          setFacebook(data.facebook || '');
          setGithub(data.github || '');
          setLinkedin(data.linkedin || '');
          setYoutube(data.youtube || '');
          setNote(data.note || '');
          setWebsite(data.website || '');
          setOtherUrl(data.otherUrl || '');
        }
        setIsLoadingData(false);
      };
      fetchData();
    }
  }, [selectedMember]);

  const handleEventCheck = (eventId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('送信中...');
    
    const formData = new FormData(e.currentTarget);
    formData.append('postType', 'people');

    const result = await createMicroCMSPost(formData);
    if (result.success) {
      setStatus('✅ ' + result.message);
      await refreshMasterData();
    } else {
      setStatus('❌ ' + result.message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-6">
        
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">編集するメンバー</label>
          <select 
            name={isAdmin ? "memberId" : undefined} // 🌟 管理者のときだけセレクトボックスから送信
            value={selectedMember || ''} 
            onChange={(e) => setSelectedMember(e.target.value)} 
            disabled={!isAdmin} 
            required 
            className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer disabled:bg-gray-50 disabled:text-gray-500"
          >
            {allowedMembers.length > 0 ? (
              allowedMembers.map((member) => (
                <option key={member.id} value={member.name}>{member.nameJa} ({member.nameEn})</option>
              ))
            ) : (
              <option value="">一致するメンバーデータが見つかりません</option>
            )}
          </select>
          
          {/* 🌟 決定的な修正：一般ユーザー(disabled)のときは、隠し項目(hidden)として確実に値をサーバーへ送信する */}
          {!isAdmin && <input type="hidden" name="memberId" value={selectedMember || ''} />}
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

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">役職 (POSITION)</label>
          <input type="text" name="position" value={position} onChange={(e) => setPosition(e.target.value)} disabled={isLoadingData} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
        </div>

        <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
          <p className="text-xs font-semibold text-gray-800 border-b border-gray-200 pb-2 uppercase tracking-wider">SNS / Web Links</p>
          
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5 text-gray-500" /> Instagram
              </label>
              <input type="url" name="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <XIcon className="w-3.5 h-3.5 text-gray-500" /> X (Twitter)
              </label>
              <input type="url" name="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://x.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <FacebookIcon className="w-3.5 h-3.5 text-gray-500" /> Facebook
              </label>
              <input type="url" name="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <YoutubeIcon className="w-3.5 h-3.5 text-gray-500" /> YouTube
              </label>
              <input type="url" name="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-gray-500" /> GitHub
              </label>
              <input type="url" name="github" value={github} onChange={(e) => setGithub(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-gray-500" /> LinkedIn
              </label>
              <input type="url" name="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <NoteIcon className="w-3.5 h-3.5 text-gray-500" /> note
              </label>
              <input type="url" name="note" value={note} onChange={(e) => setNote(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://note.com/..." />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <WebsiteIcon className="w-3.5 h-3.5 text-gray-500" /> Personal Website
              </label>
              <input type="url" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://..." />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <OtherLinkIcon className="w-3.5 h-3.5 text-gray-500" /> その他リンク (Other)
              </label>
              <input type="url" name="otherUrl" value={otherUrl} onChange={(e) => setOtherUrl(e.target.value)} disabled={isLoadingData} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="https://..." />
            </div>
          </div>
        </div>

        <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> プロフィール画像を変更</label>
          {currentImageUrl && (
            <div className="mb-4">
              <img src={currentImageUrl} alt="Preview" className="h-24 w-auto object-cover rounded-sm border border-gray-200" />
            </div>
          )}
          <input type="file" name="image" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer" />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> ABOUT用 自己紹介</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoadingData} rows={3} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
        </div>

        <div className="relative">
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><Film className="w-3.5 h-3.5" /> 参加・担当したイベント (複数選択可)</label>
          <div className="border border-gray-200 rounded-sm p-4 max-h-48 overflow-y-auto space-y-3 bg-white">
            {availableEvents.map(event => (
              <label key={event.id} className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={selectedEvents.includes(event.id)} onChange={(e) => handleEventCheck(event.id, e.target.checked)} disabled={isLoadingData} className="mt-1 rounded-sm border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{event.title}</span>
                  <span className="text-[10px] text-gray-400 uppercase">{event.year} | {event.city}</span>
                </div>
              </label>
            ))}
          </div>
          <input type="hidden" name="participatedEvents" value={JSON.stringify(selectedEvents)} />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Markdown ポートフォリオ本文</label>
          <textarea name="portfolioMd" value={portfolioMd} onChange={(e) => setPortfolioMd(e.target.value)} disabled={isLoadingData} required rows={15} className="w-full border border-gray-200 p-4 text-sm font-mono bg-gray-50 focus:bg-white rounded-sm" />
        </div>
      </div>

      <button type="submit" disabled={isLoading || isLoadingData || allowedMembers.length === 0} className="w-full py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold disabled:opacity-50">
        {(isLoading || isLoadingData) ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'ポートフォリオを更新する'}
      </button>

      {status && <div className="text-sm font-medium mt-6 text-center bg-gray-50 py-3 border border-gray-100 rounded-sm">{status}</div>}
    </form>
  );
}