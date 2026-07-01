"use server";

export async function createMicroCMSPost(formData: FormData) {
  const postType = formData.get('postType') as string;
  const title = formData.get('title') as string;
  
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;

    if (!serviceDomain || !apiKey) {
      return { success: false, message: '環境変数が設定されていません。' };
    }

    let uploadedImageField = null;
    const imageFile = formData.get('image') as File | null;
    if (imageFile && imageFile.size > 0) {
      const mediaFormData = new FormData();
      mediaFormData.append('file', imageFile);
      const mediaRes = await fetch(`https://${serviceDomain}.microcms.io/api/v1/media`, {
        method: 'POST',
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        body: mediaFormData,
      });
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        uploadedImageField = { url: mediaData.url, width: mediaData.width || 1200, height: mediaData.height || 800 };
      } else {
        return { success: false, message: '画像のアップロードに失敗しました。' };
      }
    }

    let response;
    
    // PEOPLE（ポートフォリオ）の更新処理
    if (postType === 'people') {
      const memberName = formData.get('memberId') as string;
      const portfolioMd = formData.get('portfolioMd') as string;
      const description = formData.get('description') as string;
      const position = formData.get('position') as string;
      
      // 🌟 追加：hiddenフィールドからJSON文字列を受け取って配列に戻す
      const participatedEventsStr = formData.get('participatedEvents') as string;
      const participatedEvents = participatedEventsStr ? JSON.parse(participatedEventsStr) : [];

      const searchRes = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberName}`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
      });
      const searchData = await searchRes.json();
      if (!searchData.contents || searchData.contents.length === 0) {
        return { success: false, message: '対象のメンバーデータがmicroCMS内に見つかりません。' };
      }

      const realContentId = searchData.contents[0].id;
      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people/${realContentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': apiKey,
        },
        body: JSON.stringify({ 
          portfolio_md: portfolioMd, 
          description: description,
          position: position,
          participated_events: participatedEvents // 🌟 追加：配列として送信（これが複数参照の書き方です）
        }),
      });
    } 
    // 通常の投稿処理
    else {
      let bodyData: Record<string, any> = { title };
      if (postType === 'events') {
        bodyData = {
          ...bodyData, subtitle: formData.get('subtitle'), description: formData.get('description'),
          date: formData.get('date'), location: formData.get('location'), city: formData.get('city'),
          year: Number(formData.get('year')), status: [formData.get('status')], image: uploadedImageField,
        };
      } else {
        bodyData = {
          ...bodyData, category: formData.get('category'), excerpt: formData.get('excerpt'),
          content: formData.get('content'), ...(postType === 'blog' && { image: uploadedImageField }),
        };
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

// メンバーデータ取得
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
        // 🌟 追加：紐付いているイベントデータのIDだけを抽出して配列にする
        participatedEvents: item.participated_events?.map((e: any) => e.id) || []
      };
    }
    return null;
  } catch (error) {
    console.error('データ取得エラー:', error);
    return null;
  }
}

// 🌟 追加：管理画面で選択肢として表示するための全イベント一覧を取得する関数
export async function getEventsList() {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return [];

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/events?limit=100`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store'
    });
    
    const data = await res.json();
    return data.contents.map((event: any) => ({
      id: event.id,
      title: event.title,
      year: event.year,
      city: event.city
    }));
  } catch (error) {
    console.error('イベント一覧取得エラー:', error);
    return [];
  }
}