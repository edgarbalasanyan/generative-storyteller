import React from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <>
      <input
        {...props}
        ref={ref}
        placeholder={props.placeholder}
        className={clsx(styles.input, props.className)}
      />
    </>
  );
});

export default Input;
