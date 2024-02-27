import styles from "./GoogleButton.module.scss";
import "../../sass/_typography.scss";

const GoogleButton = () => {
  return (
    <button className={styles.googleButton} type="button" >
      <img src="../../../public/google.png" alt="Google logo"></img>
      <span className="text text_googleButton">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
