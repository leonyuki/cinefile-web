"use client";

import { useState, useEffect } from 'react';
import { getEventsList, getPartnersList, getMembersList } from '../../actions/microcmsActions'; 
import { getSupabaseUsers } from '../../actions/supabaseActions';
import { getCurrentUser } from '../../actions/authActions'; // 🌟 追加: ユーザー情報取得

import UsersTab from '../../components/admin/UsersTab';
import PartnersTab from '../../components/admin/PartnersTab';
import GeneralArticleTab from '../../components/admin/GeneralArticleTab';
import PeopleTab from '../../components/admin/PeopleTab';
import EventsTab from '../../components/admin/EventsTab';

type PostType = 'news' | 'blog' | 'events' | 'people' | 'partners' | 'users';

export default function PostAdminPage() {
  const [postType, setPostType] = useState<PostType | ''>(''); // 🌟 初期値を空に
  const [userRole, setUserRole] = useState<'ADMIN' | 'PR' | 'USER' | ''>(''); // 🌟 権限ステート

  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [availableEvents, setAvailableEvents] = useState<any[]>([]);
  const [availablePartners, setAvailablePartners] = useState<any[]>([]);
  const [availableMembers, setAvailableMembers] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  const refreshMasterData = async () => {
    // 🌟 currentUser も同時に取得する
    const [events, partners, members, users, currentUser] = await Promise.all([
      getEventsList(),
      getPartnersList(),
      getMembersList(),
      getSupabaseUsers(),
      getCurrentUser() 
    ]);
    
    setAvailableEvents(events);
    setAvailablePartners(partners);
    setAvailableMembers(members);
    setAvailableUsers(users);

    // 🌟 権限のセットと、初期表示タブの自動決定
    if (currentUser) {
      setCurrentUser(currentUser);
      setUserRole(currentUser.role);
      if (!postType) {
        if (currentUser.role === 'ADMIN' || currentUser.role === 'PR') {
          setPostType('news');
        } else if (currentUser.role === 'USER') {
          setPostType('users'); // USER権限は自分のアカウント管理を初期表示
        }
      }
    }
  };

  useEffect(() => {
    refreshMasterData();
  }, []);

  // 🌟 権限に基づいて「表示を許可するタブ」の配列を返す関数
  const getVisibleTabs = (): PostType[] => {
    if (userRole === 'ADMIN') {
      return ['news', 'blog', 'events', 'people', 'partners', 'users'];
    }
    if (userRole === 'PR') {
      return ['news', 'blog', 'events', 'partners'];
    }
    if (userRole === 'USER') {
      return ['people']; // USERは自分に関するアカウントとプロフィールタブのみ表示
    }
    return [];
  };

  const visibleTabs = getVisibleTabs();

  // ユーザーの権限が判定できるまでローディング表示
  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xs tracking-widest text-gray-400 animate-pulse">LOADING DASHBOARD...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 bg-white min-h-screen">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-[10px] tracking-widest text-gray-400">DASHBOARD</p>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] tracking-widest font-bold rounded-xs">
            {userRole}
          </span>
        </div>
        <h1 className="text-2xl tracking-tight text-gray-900">CinéFile 専用管理ツール</h1>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 bg-gray-50 p-1.5 rounded-sm border border-gray-100">
        {/* 🌟 許可されたタブ（visibleTabs）だけをループしてボタンを作る */}
        {visibleTabs.map((type) => (
          <button
            key={type}
            onClick={() => setPostType(type)}
            className={`flex-1 min-w-[80px] py-2.5 text-xs tracking-widest uppercase transition-all rounded-xs font-medium ${
              postType === type ? 'bg-white text-gray-900 shadow-xs border border-gray-100' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      {/* 選択されたタブに応じてコンポーネントを出し分ける */}
      {postType === 'users' && <UsersTab availableUsers={availableUsers} refreshMasterData={refreshMasterData} currentUser={currentUser} />}
      
      {postType === 'partners' && <PartnersTab refreshMasterData={refreshMasterData} />}
      
      {(postType === 'news' || postType === 'blog') && <GeneralArticleTab postType={postType} refreshMasterData={refreshMasterData} />}
      
      {postType === 'people' && <PeopleTab availableMembers={availableMembers} availableEvents={availableEvents} refreshMasterData={refreshMasterData} currentUser={currentUser} />}
      
      {postType === 'events' && <EventsTab availableEvents={availableEvents} availablePartners={availablePartners} refreshMasterData={refreshMasterData} />}
    </div>
  );
}