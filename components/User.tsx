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
        {username && (
          <div className="flex flex-col">
            <h2 className="font-bold text-lg sm:text-2xl text-black">
              {username}
            </h2>
            <h3 className="font-medium text-md sm:text-lg text-gray-600">
              {email}
            </h3>
          </div>
        )}
        {email && (
          <h2 className="font-bold text-lg sm:text-2xl text-black">{email}</h2>
        )}
      </div>
    </div>
  );
};

export default User;
