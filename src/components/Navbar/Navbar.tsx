import { FaHome } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import styles from './Navbar.module.css';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

function Navbar() {
  return (
    <div className={styles.nav}>
      <IconContext.Provider
        value={{
          size: '20',
        }}
      >
        <NavLink
          to="/popular"
          style={({ isActive }) =>
            isActive
              ? { color: 'var(--color-primary)' }
              : { color: 'var(--color-icon)' }
          }
        >
          <FaHome />
        </NavLink>
        <NavLink
          to="/search"
          style={({ isActive }) =>
            isActive
              ? { color: 'var(--color-primary)' }
              : { color: 'var(--color-icon)' }
          }
        >
          <FaSearch />
        </NavLink>
        <NavLink
          to="/watchlist"
          style={({ isActive }) =>
            isActive
              ? { color: 'var(--color-primary)' }
              : { color: 'var(--color-icon)' }
          }
        >
          <FaHeart />
        </NavLink>
        <NavLink
          to="/friends"
          style={({ isActive }) =>
            isActive
              ? { color: 'var(--color-primary)' }
              : { color: 'var(--color-icon)' }
          }
        >
          <FaUserFriends />
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive
              ? { color: 'var(--color-primary)' }
              : { color: 'var(--color-icon)' }
          }
        >
          <BiLogOut />
        </NavLink>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
