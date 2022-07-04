import style from './FeedUpdate.module.scss';

export interface FeedUpdateProps {
  id: string;
  text: string;
  onTextChange?: (value: string) => unknown;
  onTextSubmit?: (feedId: string, value: string) => unknown;
}

const FeedUpdate = (props: FeedUpdateProps) => {
  const { id, text, onTextChange, onTextSubmit } = props;
  return (
    <form
      className={style['feedUpdate']}
      onSubmit={(event) => {
        event.preventDefault();
        text && onTextSubmit && onTextSubmit(id, text);
      }}
    >
      <h2 className="text-lg sm:text-2xl font-bold">피드 수정</h2>
      <textarea
        className={style['textarea']}
        value={text}
        onChange={(event) => {
          onTextChange && onTextChange(event.target.value);
        }}
      />
      <div className={style['footer']}>
        <button className={style['button']} type="submit">
          수정
        </button>
      </div>
    </form>
  );
};

export default FeedUpdate;
