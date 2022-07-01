import style from './User.module.scss';

export interface UserProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

const User = (props: UserProps) => {
  const { name: username, email } = props;
  return (
    <div className={style['user']}>
      <div>
        {username && <h2>이름: {username}</h2>}
        {email && <h2>이메일: {email}</h2>}
      </div>
    </div>
  );
};

export default User;
