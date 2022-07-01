import style from './Login.module.scss';

export interface LoginProps {
  email?: string;
  csrfToken?: string;
  onEmailChange?: (value: string) => unknown;
  onEmailSubmit?: (email: string) => unknown;
}

const Login = (props: LoginProps) => {
  const { email, csrfToken, onEmailChange, onEmailSubmit } = props;
  return (
    <form
      method="POST"
      className={style['login']}
      onSubmit={(event) => {
        event.preventDefault();
        onEmailSubmit && onEmailSubmit(email ?? '');
      }}
    >
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <label className={style['label']} htmlFor="email">
        로그인
      </label>
      <input
        className={style['input']}
        type="email"
        id="email"
        autoComplete="off"
        placeholder="이메일"
        value={email}
        onChange={(event) => {
          event.preventDefault();
          onEmailChange && onEmailChange(event.target.value);
        }}
      />
      <button className={style['button']} type="submit">
        로그인
      </button>
    </form>
  );
};

export default Login;
