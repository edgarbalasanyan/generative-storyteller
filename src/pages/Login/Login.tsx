import "../../sass/_typography.scss";
import styles from "./_Login.module.scss";

import Icon from "../../components/Svgs/Icon";
import IconText from "../../components/Svgs/IconText";
import { Outlet } from "react-router-dom";

export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$%]).{8,}$/;
export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Icon />
          <IconText />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Login;
