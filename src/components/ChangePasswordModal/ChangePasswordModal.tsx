import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Close from "../Svgs/Close";
import { PWD_REGEX } from "../../pages/Login/Login";
import Error from "../Svgs/Error";
import "./ChangePasswordModal.scss";
import "../../sass/_typography.scss";
import { useChange_passwordMutation } from "../../redux/api/apiSlice/serverApi";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const schema = yup.object().shape({
    old_password: yup.string().required("this field is required"),
    new_password: yup
      .string()
      .required("this field is required")
      .matches(PWD_REGEX, "Invalid password"),
    repeat_password: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref("new_password")], () => `passwords don't match`),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [changePassword] = useChange_passwordMutation();
  const [err, setErr] = useState<{ old_password: string }>();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = () => {
    changePassword({
      id: user.id,
      old_password: getValues("old_password"),
      new_password: getValues("new_password"),
      repeat_password: getValues("repeat_password"),
    }).then((res) => {
      if ("error" in res) {
        if ("data" in res.error) {
          // @ts-expect-error type error
          setErr(res.error.data.old_password);
        }
      } else {
        setShowSuccess(true);
        setTimeout(() => {
            navigate("/login/signin");
        }, 1500);
      }
    });
  };
  if (showSuccess) {
    return <div className="successfully text title2">password succesfully changed</div>;
  }
  return (
    <div
      className="changePassContainer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form className="changePassForm" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="title2">Change Password</h3>
        <div className="changePassInputFields">
          <p className="text text_label text_semibold">
            Your password must be at least 8 characters and should include a
            combination of numbers, letters and special characters (!$@%).
          </p>
          <label className="text text_label" htmlFor="old_password">
            Current password
          </label>
          <Input
            type="password"
            id="old_password"
            className={`${errors.old_password?.message && "inputError"}`}
            {...register("old_password")}
          />
          <p
            className={
              errors.old_password ? "text_label text_error errors" : "hidden"
            }
          >
            <Error />
            {errors.old_password?.message}
          </p>
          <label className="text text_label" htmlFor="new_password">
            New password
          </label>
          <Input
            type="text"
            id="new_password"
            className={`${errors.new_password?.message && "inputError"}`}
            {...register("new_password")}
          />
          <p
            className={
              errors.new_password ? "text_label text_error errors" : "hidden"
            }
          >
            <Error />
            {errors.new_password?.message}
          </p>
          <label className="text text_label" htmlFor="newPassword2">
            Re-enter new password
          </label>
          <Input
            type="text"
            id="repeat_password"
            className={`${errors.repeat_password?.message && "inputError"}`}
            {...register("repeat_password")}
          />
          <p
            className={
              errors.repeat_password?.message || err?.old_password
                ? "text_label text_error errors"
                : "hidden"
            }
          >
            <Error />
            {errors.repeat_password?.message || err?.old_password}
          </p>
        </div>
        <Button text="Save" />
      </form>
      <div onClick={onClose}>
        <Close />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
