"use server";

// 🌟 型定義とデータをインポート
import { events, Event } from '../data/events'; 

// ==========================================
// 基本の投稿・更新処理（既存ロジック）
// ==========================================
export async function createMicroCMSPost(formData: FormData) {
  const postType = formData.get('postType') as string;
  const title = formData.get('title') as string;
  
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;

    if (!serviceDomain || !apiKey) {
      return { success: false, message: '環境変数が設定されていません。' };
    }

    // メイン画像のアップロード処理
    let uploadedImageUrl: string | null = null;
    const imageFile = formData.get('image') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const mediaFormData = new FormData();
      mediaFormData.append('file', imageFile);
      
      const mediaRes = await fetch(`https://${serviceDomain}.microcms-management.io/api/v1/media`, {
        method: 'POST',
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        body: mediaFormData,
      });
      
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        uploadedImageUrl = mediaData.url; 
      } else {
        const errText = await mediaRes.text();
        console.error('画像アップロードエラー詳細:', errText);
        return { success: false, message: '画像のアップロードに失敗しました。APIキーの権限を確認してください。' };
      }
    }

    let response;
    
    if (postType === 'people') {
      const memberName = formData.get('memberId') as string;
      
      if (!memberName || memberName.trim() === '') {
        return { 
          success: false, 
          message: '編集対象のメンバーIDが送信されませんでした。画面をリロードするか、ログインし直してお試しください。' 
        };
      }

      const portfolioMd = formData.get('portfolioMd') as string;
      const description = formData.get('description') as string;
      const position = formData.get('position') as string;
      
      const instagram = formData.get('instagram') as string;
      const twitter = formData.get('twitter') as string;
      const facebook = formData.get('facebook') as string;
      const github = formData.get('github') as string;
      const linkedin = formData.get('linkedin') as string;
      const youtube = formData.get('youtube') as string;
      const note = formData.get('note') as string;
      const website = formData.get('website') as string;
      const otherUrl = formData.get('otherUrl') as string;
      
      const participatedEventsStr = formData.get('participatedEvents') as string;
      const participatedEvents = participatedEventsStr ? JSON.parse(participatedEventsStr) : [];

      const searchRes = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberName}`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
      });
      const searchData = await searchRes.json();
      if (!searchData.contents || searchData.contents.length === 0) {
        return { success: false, message: '対象のメンバーデータが見つかりません。' };
      }

      const realContentId = searchData.contents[0].id;
      
      const updateData: any = { 
        portfolio_md: portfolioMd, 
        description: description,
        position: position,
        participated_events: participatedEvents,
        instagram: instagram || "",
        twitter: twitter || "",
        facebook: facebook || "",
        github: github || "",
        linkedin: linkedin || "",
        youtube: youtube || "",
        note: note || "",
        website: website || "",
        other_url: otherUrl || ""
      };

      if (uploadedImageUrl) {
        updateData.image = uploadedImageUrl;
      }

      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people/${realContentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': apiKey,
        },
        body: JSON.stringify(updateData),
      });
    } 
    else if (postType === 'partners') {
      const name = formData.get('name') as string;
      const url = formData.get('url') as string;

      const bodyData: any = {
        name,
        url: url || undefined,
      };
      
      if (uploadedImageUrl) {
        bodyData.logo = uploadedImageUrl;
      }

      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-MICROCMS-API-KEY': apiKey },
        body: JSON.stringify(bodyData),
      });
    }
    else {
      // News / Blog 投稿処理
      let bodyData: Record<string, any> = { 
        title,
        category: formData.get('category'), 
        excerpt: formData.get('excerpt'),
        content: formData.get('content'), 
      };
      
      if (postType === 'blog' && uploadedImageUrl) {
        bodyData.image = uploadedImageUrl;
      }
      
      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${postType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-MICROCMS-API-KEY': apiKey },
        body: JSON.stringify(bodyData),
      });
    }

    if (!response.ok) {
      const errData = await response.json();
      return { success: false, message: `microCMSエラー: ${errData.message || response.statusText}` };
    }
    return { success: true, message: `${postType.toUpperCase()} が更新・投稿されました！` };
  } catch (error: any) {
    return { success: false, message: error.message || '予期せぬエラーが発生しました。' };
  }
}

// ==========================================
// News / Blog 用の CRUD アクション
// ==========================================

export async function getArticleList(endpoint: 'news' | 'blog') {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return [];

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=50&orders=-publishedAt`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error('Failed to fetch articles');
    const data = await res.json();
    return data.contents;
  } catch (error) {
    console.error(`${endpoint} 取得エラー:`, error);
    return [];
  }
}

export async function createArticle(endpoint: 'news' | 'blog', data: any) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) throw new Error('API key is missing');

  const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': apiKey,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create article');
  return await res.json();
}

export async function updateArticle(endpoint: 'news' | 'blog', id: string, data: any) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) throw new Error('API key is missing');

  const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': apiKey,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update article');
  return await res.json();
}

export async function deleteArticle(endpoint: 'news' | 'blog', id: string) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) throw new Error('API key is missing');

  const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: { 'X-MICROCMS-API-KEY': apiKey },
  });

  if (!res.ok) throw new Error('Failed to delete article');
  return true;
}

// ==========================================
// 取得用アクション
// ==========================================

export async function getMemberData(memberId: string) {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return null;

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberId}`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store'
    });
    
    const data = await res.json();
    if (data.contents && data.contents.length > 0) {
      const item = data.contents[0];
      return {
        nameJa: item.name_ja || '',
        nameEn: item.name_en || '',
        position: item.position || '',
        description: item.description || '',
        portfolioMd: item.portfolio_md || '',
        imageUrl: item.image?.url || '',
        participatedEvents: item.participated_events?.map((e: any) => e.id) || [],
        instagram: item.instagram || '',
        twitter: item.twitter || '',
        facebook: item.facebook || '',
        github: item.github || '',
        linkedin: item.linkedin || '',
        youtube: item.youtube || '',
        note: item.note || '',
        website: item.website || '',
        otherUrl: item.other_url || ''
      };
    }
    return null;
  } catch (error) {
    console.error('データ取得エラー:', error);
    return null;
  }
}

// 🌟 Event インターフェースに合わせたイベント一覧の取得
export async function getEventsList() {
  try {
    return events.map((event: Event) => ({
      id: event.id,
      title: event.title,
      subtitle: event.subtitle,
      year: event.year,
      status: event.status,
      date: event.date,
      location: event.location,
      city: event.city || '',
      image: event.image,
      bgImage: event.bgImage || '',
    }));
  } catch (error) {
    console.error('イベント一覧取得エラー:', error);
    return [];
  }
}

// 🌟 Event インターフェースに合わせたイベント詳細の取得
export async function getEventDetail(eventId: string | number): Promise<Event | null> {
  try {
    const item = events.find((e) => String(e.id) === String(eventId));
    if (!item) return null;

    return item; // Event オブジェクトをそのまま返却
  } catch (error) {
    console.error('イベント詳細取得エラー:', error);
    return null;
  }
}

export async function getPartnersList() {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return [];

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/partners?limit=100`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store'
    });
    
    const data = await res.json();
    return data.contents.map((partner: any) => ({
      id: partner.id,
      name: partner.name
    }));
  } catch (error) {
    console.error('パートナー一覧取得エラー:', error);
    return [];
  }
}

export async function getMembersList() {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return [];

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?limit=100`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store'
    });
    
    const data = await res.json();
    return data.contents.map((member: any) => ({
      id: member.id,
      name: member.name,
      nameJa: member.name_ja,
      nameEn: member.name_en,
      user_id: member.user_id
    }));
  } catch (error) {
    console.error('メンバー一覧取得エラー:', error);
    return [];
  }
}