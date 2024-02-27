import { USER_REGEX } from "../../pages/Login/Login";
import Avatar from "../Svgs/Avatar";
import "./EditProfile.scss";
import { useForm } from "react-hook-form";
import "../../sass/_typography.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Close from "../Svgs/Close";
import Error from "../Svgs/Error";
import { useAppDispatch } from "../../redux/store";
import { useEditMutation } from "../../redux/api/apiSlice/serverApi";
import { useAppSelector } from "../../redux/store";
import { addUser, changeAvatar } from "../../redux/features/userSlice";
import { useRef, useState } from "react";

const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [edit] = useEditMutation();
  const [selectedFile, setSelectedFile] = useState<null | File>();
  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: user.name, surname: user.surname },
  });
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files || !e.target?.files[0]) return;
    setSelectedFile(e.target.files[0]);
  };
  const showAvatar = () => {
    if (user.avatar.endsWith("unUploadAvatar.png")) {
      return <Avatar />;
    } else {
      if (selectedFile?.name) {
        return <img src={selectedFile.name} />;
      }
      return <img src={user.avatar} />;
    }
  };
  const onSubmit = () => {
    edit({
      id: user.id,
      name: getValues("name"),
      surname: getValues("surname"),
    })
      .then(() => {
        dispatch(
          addUser({ name: getValues("name"), surname: getValues("surname") })
        );
        dispatch(changeAvatar(selectedFile?.name || user.avatar));
      })
      .catch((err) => alert(err));

    onClose();
  };
  return (
    <div
      className="editProfileContent"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="avatarWrapper">
        <div className="avatarIcon" onClick={handleUploadClick}>
          {selectedFile?.name ? <img src={selectedFile.name} /> : showAvatar()}
          <input
            type="file"
            className="typefile"
            accept=".jpg, .png, .jpeg"
            id="collectionCreatorImage"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <form className="editContainer" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="title2">Edit profile</h3>
        <div className="editInputFields">
          <label className="text text_label" htmlFor="editedName">
            Name
          </label>
          <Input
            type="text"
            id="editedName"
            className={`${errors.name && "inputError"}`}
            {...register("name", { required: true, pattern: USER_REGEX })}
          ></Input>
          <p
            className={errors.name ? "text_label text_error errors" : "hidden"}
          >
            <Error />
            {errors.name?.type === "pattern"
              ? "Invalid name"
              : "name is required"}
          </p>
          <label className="text text_label" htmlFor="editedSurname">
            Surname
          </label>
          <Input
            type="text"
            id="editedSurname"
            className={`${errors.surname && "inputError"}`}
            {...register("surname", { required: true, pattern: USER_REGEX })}
          ></Input>
          <p
            className={
              errors.surname ? "text_label text_error errors" : "hidden"
            }
          >
            <Error />
            {errors.surname?.type === "pattern"
              ? "Invalid surname"
              : "surname is required"}
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

export default EditProfileModal;
