import { useForm } from "react-hook-form";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Error from "../../../../components/Svgs/Error";
import { EMAIL_REGEX } from "../../Login";
import "../../../../sass/_typography.scss";

import "./_Forgot.scss";
const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {};
  return (
    <form className="forgot_form" onSubmit={handleSubmit(onSubmit)}>
      {
        <div className="forgot_container">
          <h3 className="title3">Forgot your password?</h3>
          <p className="text text_semibold">
            Enter your email address and we will send you password reset
            instructions.
          </p>
          <label className="text text_label">Email</label>
          <Input
            placeholder="Enter your email"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            className={`${errors.email && "inputError"}`}
          />
          <p
            className={errors.email ? "text_label text_error errors" : "hidden"}
          >
            <Error />
            {errors.email?.type === "pattern"
              ? "Invalid email"
              : "email is required"}
          </p>
        </div>
      }
      <Button text={"Continue"} />
    </form>
  );
};

export default Forgot;
