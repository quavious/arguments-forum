import { FeedModel, SubFeedModel } from '../model/feed';
import style from './FeedComponent.module.scss';

const FeedComponent = ({ feed }: { feed: FeedModel }) => {
  return (
    <div className={style['feedComponent']}>
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

export default FeedComponent;
