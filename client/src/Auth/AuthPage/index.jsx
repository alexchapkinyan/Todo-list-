import LoginForm from "../../components/LoginForm";
import styles from "./style.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
