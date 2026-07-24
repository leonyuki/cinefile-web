"use client";

import { useState } from 'react';
import { PlusCircle, ShieldAlert, Trash2 } from 'lucide-react';
import { inviteSupabaseUser, updateSupabaseUserRole, deleteSupabaseUser } from '../../actions/supabaseActions';

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'PR' | 'USER' | string;
};

type Props = {
  availableUsers: UserItem[];
  refreshMasterData: () => Promise<void>;
  currentUser: any; 
};

export default function UsersTab({ availableUsers, refreshMasterData, currentUser }: Props) {
  const [status, setStatus] = useState('');

  // 🌟 修正1: どんな表記(Admin, admin)でも強制的に大文字に変換して確実にADMINとして認識させる
  const userRole = currentUser?.role?.toUpperCase() || 'USER';
  const isAdmin = userRole === 'ADMIN';
  
  // 🌟 修正2: ADMINなら無条件で全員を表示、それ以外(USER)なら自分だけを表示
  const allowedUsers = isAdmin 
    ? availableUsers 
    : availableUsers.filter(user => user.id === currentUser?.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('送信中...');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await inviteSupabaseUser(formData);
    
    if (result.success) {
      setStatus('✅ ' + result.message);
      form.reset();
      await refreshMasterData();
    } else {
      setStatus('❌ ' + result.message);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    setStatus('ユーザー権限を変更中...');
    const res = await updateSupabaseUserRole(userId, newRole);
    if (res.success) {
      setStatus('✅ 権限を更新しました。');
      await refreshMasterData();
    } else {
      setStatus('❌ 権限変更エラー: ' + res.message);
    }
  };

  const handleUserDelete = async (userId: number, userName: string) => {
    if (!confirm(`${userName} を完全に削除しますか？`)) return;
    setStatus('ユーザーを削除中...');
    const res = await deleteSupabaseUser(userId);
    if (res.success) {
      setStatus('✅ ユーザーを削除しました。');
      await refreshMasterData();
    } else {
      setStatus('❌ 削除エラー: ' + res.message);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* 新規登録セクション (ADMINのみ表示) */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-gray-100 bg-gray-50/50 rounded-sm">
          <p className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-gray-500" /> 新しい運営・閲覧メンバーの直接登録
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">ユーザーネーム（登録名）</label>
              <input type="text" name="name" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="映画 太郎" />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">初期パスワード</label>
              <input type="text" name="password" required minLength={4} className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="任意のパスワードを入力 (英数字)" />
            </div>
            
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">アクセス権限 (ROLE)</label>
              <select name="role" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer">
                <option value="USER">USER (自分のアカウント情報のみ修正可能)</option>
                <option value="PR">PR (NEWS, BLOG, EVENTS, PARTNERSの編集が可能)</option>
                <option value="ADMIN">ADMIN (すべて管理可能 / フルアクセス)</option>
              </select>
            </div>
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-xs font-medium">
              この内容でユーザーを作成する
            </button>
          </div>
          
          {status && <div className="text-sm font-medium mt-4 text-center text-gray-700">{status}</div>}
        </form>
      )}

      {/* 既存アカウント一覧 */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
          <ShieldAlert className="w-4 h-4 text-gray-400" /> 
          {isAdmin ? '登録ユーザーのアクセス権限変更・削除' : 'あなたのアカウント情報'}
        </p>
        
        <div className="border border-gray-100 rounded-sm divide-y divide-gray-100">
          {allowedUsers.length > 0 ? (
            allowedUsers.map((user) => (
              <div key={user.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white hover:bg-gray-50/40 transition-colors">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                
                <div className="flex items-center gap-3 shrink-0">
                  {/* 🌟 修正3: ADMINなら全員の権限変更が可能 */}
                  <select 
                    value={user.role?.toUpperCase() || 'USER'} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={!isAdmin} 
                    className="bg-gray-50 border border-gray-200 py-1.5 px-3 text-xs focus:outline-none focus:border-gray-900 rounded-xs cursor-pointer font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="PR">PR</option>
                    <option value="USER">USER</option>
                  </select>
                  
                  {/* 🌟 修正4: ADMINなら削除ボタンが押せる */}
                  <button 
                    type="button" 
                    onClick={() => handleUserDelete(user.id, user.name)} 
                    disabled={!isAdmin}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-all disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 text-center py-6">ユーザー情報が見つかりません</p>
          )}
        </div>
      </div>
    </div>
  );
}