import { SubFeedModel } from '@models/feed';
import style from './SubFeed.module.scss';

export interface SubFeedProps {
  subFeed: SubFeedModel;
  isCreatedNow?: boolean;
}

const SubFeed = (props: SubFeedProps) => {
  const { subFeed, isCreatedNow } = props;
  return (
    <div
      className={
        style['subFeed'] + `${isCreatedNow ? ' border border-red-600' : ''}`
      }
    >
      <div className="mt-2 items-center">
        <h3 className="mt-2 font-semibold text-pink-900">
          {subFeed.fakeUsername}
        </h3>
        <h5 className="hidden ml-0 sm:ml-auto sm:flex font-semibold">
          {subFeed.createdAt}
        </h5>
      </div>
      <p>{subFeed.content}</p>
      <h5 className="flex sm:hidden font-semibold">{subFeed.createdAt}</h5>
    </div>
  );
};

export default SubFeed;
