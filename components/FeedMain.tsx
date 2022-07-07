import { FeedModel, SubFeedModel } from '@models/feed';
import { useRouter } from 'next/router';
import style from './FeedMain.module.scss';

export interface FeedMainProps {
  feed: FeedModel;
  onUpdateClick?: (feedId: string) => unknown;
  onDeleteClick?: (feedId: string) => unknown;
}

const FeedMain = (props: FeedMainProps) => {
  const { feed, onDeleteClick } = props;
  const router = useRouter();
  return (
    <div className={style['feedMain']}>
      <h5 className={style['username']}>{feed.fakeUsername}</h5>
      <p
        className={style['content']}
        dangerouslySetInnerHTML={{
          __html: feed.content.split('\n').join('<br />'),
        }}
      />
      <div className="flex items-center">
        <h5 className="mt-2 text-blue-900 font-bold">
          {feed.subFeed} 서브피드
        </h5>
        <div className="flex items-center ml-auto">
          <button
            className="py-0.5 px-2 border border-red-600 text-red-600 bg-transparent font-semibold rounded ml-2"
            onClick={async (event) => {
              event.preventDefault();
              await router.push(`/feeds/edit/${feed.id}`);
            }}
          >
            수정
          </button>
          <button
            className="py-0.5 px-2 bg-red-600 text-white font-semibold rounded ml-2"
            onClick={() => {
              onDeleteClick && onDeleteClick(feed.id);
            }}
          >
            삭제
          </button>
        </div>
      </div>
      <hr className={style['divider']} />
      <a
        href={feed.newsLink}
        target="__blank"
        dangerouslySetInnerHTML={{
          __html: feed.newsTitle.replace(/<(.|\n)*?>/g, ''),
        }}
        className={style['newsTitle']}
      />
    </div>
  );
};

export default FeedMain;
