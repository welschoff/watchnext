import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { verifyLogin } from '../../utils/api';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user: Partial<User> = { username, password };
    await verifyLogin(user);
    navigate('/popular');
  }

  function validateForm() {
    return username.trim().length > 0 && password.trim().length > 0;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        required
        value={username}
        placeholder="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        value={password}
        required
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
