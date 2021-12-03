import React, { useState } from 'react';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  return (
    <form className={styles.form}>
      <input
        type="text"
        value={username}
        placeholder="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="submit"
        value="Login"
        className={styles.login}
        disabled={!validateForm()}
      />
    </form>
  );
}

export default LoginForm;
