import Link from 'next/link';
import style from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={style['navbar']}>
      <h3 className={style['logo']}>ARGUMENTS</h3>
      <div className={style['navMenu']}>
        <h3 className={style['item']}>
          <Link href={'/'}>뉴스</Link>
        </h3>
        <h3 className={style['item']}>
          <Link href={'/'}>피드</Link>
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
