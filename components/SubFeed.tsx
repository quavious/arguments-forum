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
      <div className="flex items-center">
        <h3 className="font-semibold text-pink-900">{subFeed.fakeUsername}</h3>
        <h5 className="hidden ml-0 sm:ml-auto sm:flex font-medium text-sm">
          {new Date(subFeed.createdAt).toLocaleString()}
        </h5>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: subFeed.content.split('\n').join('<br />'),
        }}
      />
      <h5 className="flex sm:hidden font-medium text-sm">
        {new Date(subFeed.createdAt).toLocaleString()}
      </h5>
    </div>
  );
};

export default SubFeed;
