import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.burger}>
        <svg
          width="29"
          height="25"
          viewBox="0 0 29 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29 24.2H0V20.1667H29V24.2ZM29 14.1167H0V10.0833H29V14.1167ZM29 4.03333H0V0H29V4.03333Z"
            fill="#FF6915"
          />
        </svg>
      </div>
      <div>
        <h2 className={styles.title}>Headline</h2>
      </div>
      <div className={styles.search}>
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
      </div>
    </nav>
  );
}

export default Navbar;
