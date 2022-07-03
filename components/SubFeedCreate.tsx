import style from './SubFeedCreate.module.scss';

export interface SubFeedCreateProps {
  content?: string;
  onContentChange?: (value: string) => unknown;
  onContentSubmit?: (value: string) => unknown;
}

const SubFeedCreate = (props: SubFeedCreateProps) => {
  const { content, onContentChange, onContentSubmit } = props;
  return (
    <div className={style['subFeedCreate']}>
      <form
        method="post"
        className={style['subFeedForm']}
        onSubmit={(event) => {
          event.preventDefault();
          if (!content || content.length < 1) {
            return;
          }
          onContentSubmit && onContentSubmit(content);
        }}
      >
        <textarea
          value={content}
          onChange={(event) => {
            event.preventDefault();
            onContentChange && onContentChange(event.target.value);
          }}
        />
        <footer className={style['footer']}>
          <h4 className="font-semibold text-gray-600 px-1">
            서브피드 작성 중...
          </h4>
          <button
            type="submit"
            className="ml-auto px-2 font-medium rounded text-white bg-pink-900"
          >
            작성
          </button>
        </footer>
      </form>
    </div>
  );
};

export default SubFeedCreate;
