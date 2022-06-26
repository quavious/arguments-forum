import style from './FeedCreate.module.scss';

export interface FeedCreateProps {
  text?: string;
  onTextChange?: (text: string) => unknown;
  onTextSubmit?: (text: string) => unknown;
}

const FeedCreate = (props: FeedCreateProps) => {
  const { text, onTextChange, onTextSubmit } = props;
  return (
    <form
      className={style['feedCreate']}
      onSubmit={(event) => {
        event.preventDefault();
        text && onTextSubmit && onTextSubmit(text);
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <textarea
        className={style['textarea']}
        value={text}
        onChange={(event) => {
          onTextChange && onTextChange(event.target.value);
        }}
      />
      <div className={style['footer']}>
        <h3 className={style['subTitle']}>댓글 작성 중...</h3>
        <button className={style['button']} type="submit">
          등록
        </button>
      </div>
    </form>
  );
};

export default FeedCreate;
