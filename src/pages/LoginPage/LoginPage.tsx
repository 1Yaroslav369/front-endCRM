import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
//styles
import styles from  './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginValue = formData.get('login') as string;
    const passwordValue = formData.get('password') as string;
    const user = await login(loginValue, passwordValue);

    setUser(user);
    navigate('/dashboard');
  };

  return (
    <div className='container'>
      <div className={styles.form_wrapper}>
        <h1 className={styles.loginTitle}>Welcome Back</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="text"
            name="login"
            placeholder="Enter your login"
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <button className={styles.button} type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
