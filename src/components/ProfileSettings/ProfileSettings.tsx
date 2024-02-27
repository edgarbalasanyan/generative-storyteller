import { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import EditProfile from "../Svgs/EditProfile";
import Help from "../Svgs/Help";
import Logout from "../Svgs/Logout";
import Settings from "../Svgs/Settings";
import "./ProfileSettings.scss";
import { useAppDispatch } from "../../redux/store";
import { useLogoutMutation } from "../../redux/api/apiSlice/serverApi";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/features/userSlice";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

const ProfileSettings = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const showEditModal = () => setShowEdit(true);
  const closeEditModal = () => setShowEdit(false);
  const showChangePassModal = () => setShowChangePass(true);
  const closeChangePassModal = () => setShowChangePass(false);
  return (
    <>
      <ul className="profileSettingsContainer">
        <li className="settingsItem text text_label" onClick={showEditModal}>
          <EditProfile />
          Edit Profile
        </li>
        <li
          className="settingsItem text text_label"
          onClick={showChangePassModal}
        >
          <Settings />
          Change Password
        </li>
        <li className="settingsItem text text_label">
          <Help />
          Help
        </li>
        <li
          className="settingsItem text text_label"
          onClick={() => {
            logout({});
            dispatch(removeUser());
            navigate("/login/signin");
          }}
        >
          <Logout />
          Log out
        </li>
      </ul>
      {showEdit && (
        <div className="editProfileOverlay" onClick={closeEditModal}>
          <EditProfileModal onClose={closeEditModal} />
        </div>
      )}
      {showChangePass && (
        <div className="editProfileOverlay" onClick={closeChangePassModal}>
          <ChangePasswordModal onClose={closeChangePassModal} />
        </div>
      )}
    </>
  );
};

export default ProfileSettings;
