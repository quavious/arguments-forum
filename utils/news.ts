import { nanoid } from 'nanoid';
import { NewsModel, NewsResponse } from '@models/news';

export let newsData: NewsModel[] = [];

export const getNewsData = async () => {
  if (newsData.length > 0 && process.env.NODE_ENV !== 'production') {
    return newsData;
  }
  const naverId = process.env.NAVER_ID;
  const naverSecret = process.env.NAVER_SECRET;
  if (!naverId || !naverSecret) {
    return [];
  }
  const keyword = '정치%2C사회%2C경제%2C국제';
  const newsUrl = `https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=100&start=1&sort=date`;
  const resp = await fetch(newsUrl, {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': naverId,
      'X-Naver-Client-Secret': naverSecret,
    },
  });
  const data: NewsResponse = await resp.json();
  const converted: NewsModel[] = data.items.map((item) => ({
    id: nanoid(),
    title: item.title.replace(/<(.|\n)*?>/g, ''),
    link: item.originallink.replace('http://', 'https://'),
    description: item.description.replace(/<(.|\n)*?>/g, ''),
    publishedAt: item.pubDate,
  }));
  if (process.env.NODE_ENV === 'production') {
    return converted;
  }
  if (newsData.length === 0) {
    newsData = converted;
  }
  return newsData;
};
