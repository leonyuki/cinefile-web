"use client";

import { useState, useEffect } from 'react';
import { FileText, Image as ImageIcon, Loader2, Plus, ArrowLeft, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { getArticleList, createMicroCMSPost, updateArticle, deleteArticle } from '../../actions/microcmsActions';

type Props = {
  postType: 'news' | 'blog';
  refreshMasterData: () => Promise<void> | void;
};

export default function GeneralArticleTab({ postType, refreshMasterData }: Props) {
  const [articles, setArticles] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 🌟 追加：確認画面モードのステート
  const [isConfirming, setIsConfirming] = useState(false);

  // フォーム用ステート
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // 記事一覧の取得
  const fetchArticles = async () => {
    const data = await getArticleList(postType);
    setArticles(data || []);
  };

  useEffect(() => {
    fetchArticles();
    setViewMode('list');
    setStatus('');
    setIsConfirming(false); // タブ切り替え時にリセット
  }, [postType]);

  const handleCreateNew = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setStatus('');
    setIsConfirming(false); // リセット
    setViewMode('form');
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title || '');
    setCategory(article.category || '');
    setExcerpt(article.excerpt || '');
    setContent(article.content || '');
    setStatus('');
    setIsConfirming(false); // リセット
    setViewMode('form');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの投稿を削除しますか？\n※この操作は取り消せません。')) return;
    
    try {
      await deleteArticle(postType, id);
      alert('削除しました。');
      fetchArticles(); 
    } catch (error) {
      alert('削除に失敗しました。');
    }
  };

  // 送信処理（確認ステップを挟む）
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
    
    try {
      if (editingId) {
        // --- 編集モード ---
        const updateData = { title, category, excerpt, content };
        await updateArticle(postType, editingId, updateData);
        
        setStatus(`✅ ${postType.toUpperCase()} を更新しました！`);
        await refreshMasterData();
        fetchArticles();
        
        setTimeout(() => setViewMode('list'), 1500);

      } else {
        // --- 新規作成モード ---
        const formData = new FormData(e.currentTarget);
        formData.append('postType', postType);

        const result = await createMicroCMSPost(formData);
        
        if (result.success) {
          setStatus('✅ ' + result.message);
          await refreshMasterData();
          fetchArticles();
          setTimeout(() => setViewMode('list'), 1500);
        } else {
          setStatus('❌ ' + result.message);
        }
      }
    } catch (error) {
      setStatus('❌ エラーが発生しました。');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ① 一覧表示モードの画面
  // ==========================================
  if (viewMode === 'list') {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">
            {postType} 記事一覧
          </h2>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 bg-gray-950 text-white px-4 py-2.5 text-xs tracking-widest rounded-sm hover:bg-gray-800 transition-colors font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> 新規作成
          </button>
        </div>

        <div className="space-y-3">
          {articles.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50">
              <p className="text-xs tracking-widest text-gray-400">記事がまだありません</p>
            </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{article.title}</h3>
                  <p className="text-[10px] tracking-widest text-gray-400">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ja-JP')} 
                    {article.category && <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-xs">{article.category}</span>}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <Edit2 className="w-3 h-3" /> 編集
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-gray-200 hover:bg-red-50 rounded-sm transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> 削除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // ② 編集・作成モードの画面
  // ==========================================
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">
          {editingId ? `${postType} の編集` : `${postType} の新規作成`}
        </h2>
        <button
          onClick={() => {
            setViewMode('list');
            setIsConfirming(false);
          }}
          className="flex items-center gap-1.5 text-xs font-medium tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 一覧へ戻る
        </button>
      </div>

      {/* 🌟 確認画面中のアラート表示 */}
      {isConfirming && (
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
            <input 
              type="text" 
              name="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              readOnly={isConfirming}
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`} 
              placeholder="記事のタイトルを入力" 
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">カテゴリ</label>
            <input 
              type="text" 
              name="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              readOnly={isConfirming}
              className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`}  
              placeholder="例: お知らせ" 
            />
          </div>
        </div>

        {postType === 'blog' && !editingId && (
          <div className={`p-5 border border-dashed rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-200 opacity-60 pointer-events-none' : 'bg-gray-50 border-gray-300'}`}>
            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> メイン画像
            </label>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              required={!editingId}
              className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer transition-opacity" 
            />
            {isConfirming && <p className="text-[10px] text-gray-400 mt-2">※画像は選択済みのものがアップロードされます。</p>}
          </div>
        )}

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">記事の抜粋・概要</label>
          <input 
            type="text" 
            name="excerpt" 
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            readOnly={isConfirming}
            className={`w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`}  
            placeholder="一覧画面に表示される1行の紹介文" 
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> 本文 / 説明文
          </label>
          <textarea 
            name="content" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required 
            rows={12} 
            readOnly={isConfirming}
            className={`w-full border p-3 text-sm focus:outline-none resize-y rounded-sm leading-relaxed transition-colors ${isConfirming ? 'bg-gray-50 border-gray-100 text-gray-500 pointer-events-none' : 'border-gray-200 focus:border-gray-900'}`}  
            placeholder="ここに本文を入力してください..." 
          />
        </div>

        {/* 🌟 ボタンエリアの切り替え */}
        {!isConfirming ? (
          <button 
            type="submit" 
            className="w-full py-4 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold"
          >
            入力内容を確認する
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
                'この内容で送信する'
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
    </div>
  );
}