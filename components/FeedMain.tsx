import { FeedModel, SubFeedModel } from '@models/feed';
import style from './FeedMain.module.scss';

export interface FeedMainProps {
  feed: FeedModel;
  onUpdateClick?: (feedId: string) => unknown;
  onDeleteClick?: (feedId: string) => unknown;
}

const FeedMain = (props: FeedMainProps) => {
  const { feed, onDeleteClick } = props;
  return (
    <div className={style['feedMain']}>
      <h5 className={style['username']}>{feed.fakeUsername}</h5>
      <p className={style['content']}>{feed.content}</p>
      <div className="flex items-center">
        <h5 className="mt-2 text-blue-900 font-bold">
          {feed.subFeed} 서브피드
        </h5>
        <div className="flex items-center ml-auto">
          <button
            className="py-0.5 px-2 bg-red-600 text-white font-semibold rounded"
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
        dangerouslySetInnerHTML={{ __html: feed.newsTitle }}
        className={style['newsTitle']}
      />
    </div>
  );
};

export default FeedMain;
