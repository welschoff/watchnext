import { useState } from 'react';
import styles from './OverlayMenu.module.css';
import { Link } from 'react-router-dom';
import Star from '../../assets/star.svg';
import Friends from '../../assets/friends.svg';
import Watchlist from '../../assets/myseries.svg';
import { useNavigate } from 'react-router-dom';
import Logout from '../../assets/logout.svg';
import { useSpring, animated } from 'react-spring';

export type OverlayMenuProps = {
  title?: string;
};

function OverlayMenu({ title }: OverlayMenuProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const props = useSpring({
    opacity: navbarOpen ? 1 : 0,
    delay: 350,
  });

  function handleClick() {
    setNavbarOpen(!navbarOpen);
  }

  async function logout(event: { preventDefault: () => void }) {
    event.preventDefault();
    localStorage.removeItem('Current user');
    navigate('/');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.burger} onClick={handleClick}>
        <div className={navbarOpen ? styles.lineOne : ''}></div>
        <div className={navbarOpen ? styles.lineTwo : ''}></div>
        <div className={navbarOpen ? styles.lineThree : ''}></div>
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <ul
        className={`${styles.nav_links} ${navbarOpen ? styles.nav_open : ''} `}
      >
        <Link to="/popular">
          <animated.li style={props}>
            <img className={styles.popular} src={Star} alt="" />
            <span>Popular</span>
          </animated.li>
        </Link>

        <Link to="/watchlist">
          <animated.li style={props}>
            <img className={styles.watchlist} src={Watchlist} alt="" />
            <span>Watchlist</span>
          </animated.li>
        </Link>
        <Link to="/friends">
          <animated.li style={props}>
            <img src={Friends} alt="" />
            <span>Friends</span>
          </animated.li>
        </Link>
        <animated.li onClick={logout} style={props}>
          <img src={Logout} alt="" />
          <span>Logout</span>
        </animated.li>
      </ul>
      <div className={styles.search}>
        <Link to="/search">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6912 21.5594C13.0633 21.5589 15.367 20.7582 17.2355 19.2849L23.1103 25.2083L25 23.303L19.1252 17.3796C20.5872 15.4954 21.3818 13.172 21.3824 10.7797C21.3824 4.83604 16.586 0 10.6912 0C4.79633 0 0 4.83604 0 10.7797C0 16.7234 4.79633 21.5594 10.6912 21.5594ZM10.6912 2.69493C15.1133 2.69493 18.7096 6.32095 18.7096 10.7797C18.7096 15.2385 15.1133 18.8645 10.6912 18.8645C6.26904 18.8645 2.6728 15.2385 2.6728 10.7797C2.6728 6.32095 6.26904 2.69493 10.6912 2.69493Z"
              fill="#FF6915"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default OverlayMenu;
