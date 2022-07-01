import style from './Verification.module.scss';

const Verification = () => {
  return (
    <div className={style['verification']}>
      <h1 className={style['title']}>로그인 확인</h1>
      <p className={style['description']}>
        인증 메일이 이메일 주소로 발송되었습니다.
      </p>
    </div>
  );
};

export default Verification;
