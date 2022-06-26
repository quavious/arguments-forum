import { nanoid } from 'nanoid';
import { subDays, formatDistanceToNow, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { NewsModel } from '../model/news';
import style from './News.module.scss';
import { useState } from 'react';
import FeedCreate from './FeedCreate';

export interface NewsItemProps {
  index?: number;
  news?: NewsModel;
  onFormSubmit?: (index: number, text: string) => unknown;
}

export const NewsItem = (props: NewsItemProps) => {
  const { index, news, onFormSubmit } = props;
  const [form, setForm] = useState({
    text: '',
    isOpen: false,
  });
  if (!news) {
    return <></>;
  }
  return (
    <div
      key={news.id}
      className={style['news']}
      onClick={(event) => {
        if (typeof index !== 'number') {
          return;
        }
        setForm(() => ({ ...form, isOpen: !form.isOpen }));
      }}
    >
      <header className={style['header']}>
        <h2
          className={style['title']}
          dangerouslySetInnerHTML={{
            __html: news.title.replace(/<(.|\n)*?>/g, ''),
          }}
        />
        <h5 className={style['publishedAt']}>
          {formatDistanceToNow(new Date(news.publishedAt), { locale: ko }) +
            ' 전'}
        </h5>
      </header>
      <p
        className={style['description']}
        dangerouslySetInnerHTML={{
          __html: news.description.replace(/<(.|\n)*?>/g, ''),
        }}
      />
      <footer className={style['footer']}>
        <a className={style['link']} href={news.link} target="__blank">
          {'원문 보기'}
        </a>
        <h5 className={style['publishedAt']}>
          {formatDistanceToNow(new Date(news.publishedAt), { locale: ko }) +
            ' 전'}
        </h5>
      </footer>
      {form.isOpen && (
        <FeedCreate
          text={form.text}
          onTextChange={(value) => {
            setForm({
              ...form,
              text: value,
            });
          }}
          onTextSubmit={(value) => {
            if (typeof index !== 'number') {
              return;
            }
            onFormSubmit && onFormSubmit(index, value);
          }}
        />
      )}
    </div>
  );
};

export const newsItemDemo = {
  id: nanoid(),
  title: '‘청년·민간 고용’ 빠진 장밋빛 취업률의 허상',
  description:
    '정부는 과감한 규제혁파와 일자리 창출 주역인 기업인의 사기를 높이는 데 힘써야 한다. 정치권 또한 서비스산업과 첨단 산업 육성 등 고용 증대를 위한 법적 뒷받침에 적극 나서길 당부한다.',
  link: 'http://www.skyedaily.com/news/news_view.html?ID=159551',
  publishedAt: 'Mon, 20 Jun 2022 00:04:00 +0900',
};
