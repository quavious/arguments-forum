/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import style from './Navbar.module.scss';

export const LoggedIn = ({ username }: { username: string }) => {
  return (
    <>
      <h5 className={style['item']}>
        <Link href="/user">{username}</Link>
      </h5>
      <h5
        className={style['item'] + ' ' + style['logout']}
        onClick={async (event) => {
          event.preventDefault();
          await signOut({ redirect: true, callbackUrl: '/' });
        }}
      >
        로그아웃
      </h5>
    </>
  );
};

export const NotLoggedIn = () => {
  return (
    <h5 className={style['item']}>
      <Link href="/auth/login">로그인</Link>
    </h5>
  );
};

const Navbar = () => {
  const [isLoading] = useState(false);
  const { data, status } = useSession();
  return (
    <nav className={style['navbar']}>
      <div className="flex flex-col sm:flex-row">
        <h3 className={style['logo']}>
          <Link href={'/'}>ARGUMENTS</Link>
        </h3>
        <div className={style['navMenu']}>
          <h3 className={style['item']}>
            <Link href={'/'}>뉴스</Link>
          </h3>
          <h3 className={style['item']}>
            <Link href={'/feeds/new'}>피드</Link>
          </h3>
          {!isLoading &&
            (status === 'authenticated' && data ? (
              <LoggedIn username={'마이페이지'} />
            ) : status === 'unauthenticated' ? (
              <NotLoggedIn />
            ) : (
              <></>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
