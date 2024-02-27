import Button from "../../../../components/Button/Button";
import GoogleButton from "../../../../components/Google-Button/GoogleButton";
import Input from "../../../../components/Input/Input";
import { useForm } from "react-hook-form";
import "../../../../sass/_typography.scss";
import "./_SignUp.scss";
import Error from "../../../../components/Svgs/Error";
import { Link } from "react-router-dom";
import { USER_REGEX,PWD_REGEX,EMAIL_REGEX } from "../../Login";

type DataType = {
  fullname: string;
  email: string;
  password: string;
};


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataType>();

  const onSubmit = () => {};

  return (
    <form className="signUpContainer" onSubmit={handleSubmit(onSubmit)}>
      <div className="signUpInputs">
        <h2 className="title2">Create your account</h2>
        <label className="text text_label">Fill name and surname</label>
        <div className="inputWrapper">
          <Input
            autoFocus
            placeholder="Enter your full name"
            {...register("fullname", { required: true, pattern: USER_REGEX })}
            className={`${errors.fullname && "inputError"}`}
          />
          <p
            className={
              errors.fullname ? "text_label text_error errors" : "hidden"
            }
          >
            <Error />
            {errors.fullname?.type === "pattern"
              ? "Invalid fullname"
              : "fullname is required"}
          </p>
        </div>
        <label className="text text_label">Email</label>
        <div className="inputWrapper">
          <Input
            placeholder="Enter your email"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            className={`${errors.email && "inputError"}`}
          ></Input>
          <p
            className={errors.email ? "text_label text_error errors" : "hidden"}
          >
            <Error />
            {errors.email?.type === "pattern"
              ? "Invalid email"
              : "email is required"}
          </p>
        </div>
        <label className="text text_label">Password</label>
        <div className="inputWrapper">
          <Input
            placeholder="Enter your password"
            {...register("password", { required: true, pattern: PWD_REGEX })}
            className={`${errors.password && "inputError"}`}
          ></Input>
          <p
            className={
              errors.password ? "text_label text_error errors" : "hidden"
            }
          >
            <Error />
            {errors.password?.type === "pattern"
              ? "Invalid password"
              : "password is required"}
          </p>
        </div>
      </div>

      <div className="signUpButtons">
        <Button
          text={"Create account"}
          // type="submit"
        />
        <GoogleButton />
        <p className="text text_normal">
          Already have an account?{" "}
          <Link to={"/login/signin"} className="text_normal">
            SignIn
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
