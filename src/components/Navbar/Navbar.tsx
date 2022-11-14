import { FaHome } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import styles from './Navbar.module.css';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className={styles.nav}>
      <IconContext.Provider
        value={{ color: 'var(--color-primary)', size: '20' }}
      >
        <NavLink to="/popular">
          <FaHome />
        </NavLink>
        <NavLink to="/search">
          <FaSearch />
        </NavLink>
        <NavLink to="/watchlist">
          <FaHeart />
        </NavLink>
        <BiLogOut />
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
