import styles from "./Button.module.scss";
import "../../sass/_typography.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = (props: Props) => {
  return (
    <button className={styles.button} {...props}>
      <span className="text text_button">{props.text}</span>
    </button>
  );
};

export default Button;
