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

    // 1. 画像ファイルがある場合のメディアアップロード処理
    let uploadedImageField = null;
    const imageFile = formData.get('image') as File | null;

    if (imageFile && imageFile.size > 0) {
      const mediaFormData = new FormData();
      mediaFormData.append('file', imageFile);

      const mediaRes = await fetch(`https://${serviceDomain}.microcms.io/api/v1/media`, {
        method: 'POST',
        headers: {
          'X-MICROCMS-API-KEY': apiKey,
        },
        body: mediaFormData,
      });

      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        uploadedImageField = {
          url: mediaData.url,
          width: mediaData.width || 1200,
          height: mediaData.height || 800,
        };
      } else {
        return { success: false, message: '画像のアップロードに失敗しました。' };
      }
    }

    // 2. 処理分岐
    let response;
    
    // PEOPLE（ポートフォリオ）の更新処理
    if (postType === 'people') {
      const memberName = formData.get('memberId') as string; // 'katsuki' など
      const portfolioMd = formData.get('portfolioMd') as string;

      // ① まず name で検索して、実際のコンテンツIDを取得する
      const searchRes = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberName}`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
      });
      const searchData = await searchRes.json();

      if (!searchData.contents || searchData.contents.length === 0) {
        return { success: false, message: '対象のメンバーデータがmicroCMS内に見つかりません。' };
      }

      const realContentId = searchData.contents[0].id;

      // ② 取得した実際のIDに向けてPATCHリクエスト（更新）を送る
      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people/${realContentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': apiKey,
        },
        body: JSON.stringify({ portfolio_md: portfolioMd }),
      });
    } 
    // 通常の投稿（NEWS / BLOG / EVENTS）の作成処理
    else {
      let bodyData: Record<string, any> = { title };

      if (postType === 'events') {
        bodyData = {
          ...bodyData,
          subtitle: formData.get('subtitle'),
          description: formData.get('description'),
          date: formData.get('date'),
          location: formData.get('location'),
          city: formData.get('city'),
          year: Number(formData.get('year')),
          status: [formData.get('status')],
          image: uploadedImageField,
        };
      } else {
        bodyData = {
          ...bodyData,
          category: formData.get('category'),
          excerpt: formData.get('excerpt'),
          content: formData.get('content'),
          ...(postType === 'blog' && { image: uploadedImageField }),
        };
      }

      response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${postType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': apiKey,
        },
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

// 既存のマークダウンを取得するための専用関数
export async function getMemberPortfolio(memberId: string) {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;

    if (!serviceDomain || !apiKey) return '';

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberId}`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      // キャッシュを無効化し、常に最新のデータを取得する
      cache: 'no-store'
    });
    
    const data = await res.json();
    if (data.contents && data.contents.length > 0) {
      return data.contents[0].portfolio_md || '';
    }
    return '';
  } catch (error) {
    console.error('ポートフォリオ取得エラー:', error);
    return '';
  }
}