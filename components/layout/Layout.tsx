import Navbar from '../Navbar';
import style from './Layout.module.scss';

export interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={style['layout']}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
