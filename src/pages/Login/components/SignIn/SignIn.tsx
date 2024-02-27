import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import "../../../../sass/_typography.scss";
import "./_SignIn.scss";
import { useForm } from "react-hook-form";
import Error from "../../../../components/Svgs/Error";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../Login";
import { useLoginMutation } from "../../../../redux/api/apiSlice/serverApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";

type LoginResult = {
  data?: object;
  error?: FetchBaseQueryError | SerializedError;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [err, setErr] = useState<FetchBaseQueryError | SerializedError>();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const { data, error }: LoginResult = await login({
      email: getValues("email"),
      password: getValues("password"),
    });
    if (!error) {
      navigate("/my-account", { replace: true });
      window.history.forward();
    } else {
      setErr(error);
    }
  };

  if (isLoading) return <h1>Loading</h1>;
  return (
    <form className="signInContainer" onSubmit={handleSubmit(onSubmit)}>
      <div className="signInInputs">
        <h2 className="title2">Sign in</h2>
        <label className="text text_label">Email</label>
        <div>
          <Input
            placeholder="Enter your email"
            onClick={() => setErr(undefined)}
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
        <label className="text text_label">Password</label>
        <div>
          <Input
            placeholder="Enter your password"
            onClick={() => setErr(undefined)}
            {...register("password", { required: true, pattern: /^.{4,}$/ })}
            className={`${errors.password && "inputError"}`}
          />
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
        {err && (
          <>
            <p className="text_label text_error errors">
              <Error /> wrong login or password
            </p>
          </>
        )}
        <Link className="text text_forgotPassword" to={"/login/forgot"}>
          Forgot your password?
        </Link>
      </div>
      <div className="signInButtons">
        <Button text={"Sign in"} />
        <p className="text text_normal">
          Dont have an account?{" "}
          <Link to={"/login/signup"} className="text_normal">
            Create one
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
