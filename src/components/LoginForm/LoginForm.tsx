import React from 'react';
import styles from './LoginForm.module.css';

function LoginForm() {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <input type="submit" value="Login" className={styles.login} />
    </form>
  );
}

export default LoginForm;
