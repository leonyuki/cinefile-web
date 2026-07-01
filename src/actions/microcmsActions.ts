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
    
    // 🌟 PEOPLE（ポートフォリオ）の更新処理
    if (postType === 'people') {
      const memberName = formData.get('memberId') as string;
      const portfolioMd = formData.get('portfolioMd') as string;
      const description = formData.get('description') as string; // 🌟 追加

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
        body: JSON.stringify({ portfolio_md: portfolioMd, description: description }), // 🌟 descriptionも含めて保存
      });
    } 
    // 通常の投稿処理...
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

// 🌟 修正: 取得関数も description を返すように変更
export async function getMemberData(memberId: string) {
  try {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    if (!serviceDomain || !apiKey) return { portfolioMd: '', description: '' };

    const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/people?filters=name[equals]${memberId}`, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      cache: 'no-store'
    });
    
    const data = await res.json();
    if (data.contents && data.contents.length > 0) {
      return {
        portfolioMd: data.contents[0].portfolio_md || '',
        description: data.contents[0].description || '' // 🌟 追加
      };
    }
    return { portfolioMd: '', description: '' };
  } catch (error) {
    console.error('データ取得エラー:', error);
    return { portfolioMd: '', description: '' };
  }
}