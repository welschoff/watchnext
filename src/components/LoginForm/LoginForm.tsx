import React from 'react';
import styles from './LoginForm.module.css';

function LoginForm() {
  return (
    <form className={styles.login}>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
