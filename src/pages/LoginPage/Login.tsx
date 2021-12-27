import styles from './Login.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../assets/watchnext.png';

function Login() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={Logo} alt="" />
      <div className={styles.form}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
