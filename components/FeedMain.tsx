import { FeedModel, SubFeedModel } from '@models/feed';
import style from './FeedMain.module.scss';

const FeedMain = ({ feed }: { feed: FeedModel }) => {
  return (
    <div className={style['feedMain']}>
      <h5 className={style['username']}>{feed.fakeUsername}</h5>
      <p className={style['content']}>{feed.content}</p>
      <h5 className="mt-2 text-blue-900 font-bold">{feed.subFeed} 서브피드</h5>
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
