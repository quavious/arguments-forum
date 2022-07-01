import { FeedModel } from '../model/feed';
import style from './Feed.module.scss';

const Feed = ({ feed }: { feed: FeedModel }) => {
  const compareDate = (createdDate: string) => {
    const now = new Date();
    const createdAt = new Date(createdDate);
    if (now.toLocaleDateString() !== createdAt.toLocaleDateString()) {
      return createdAt.toLocaleDateString();
    } else {
      return createdAt.toLocaleTimeString();
    }
  };
  return (
    <div className={style['feed']}>
      <div className="flex items-center mt-4 sm:mt-2">
        <h5 className={style['username']}>{feed.fakeUsername}</h5>
        <h5 className={style['createdAt']}>{compareDate(feed.createdAt)}</h5>
      </div>
      <p className={style['content']}>{feed.content}</p>
      <h5 className=" text-blue-900 font-bold">{feed.subFeed} 서브피드</h5>
      <hr className={style['divider']} />
      <a href={feed.newsLink} className={style['newsLink']} target="__blank">
        {feed.newsTitle}
      </a>
    </div>
  );
};

export default Feed;
