import { LegacyRef, useState } from "react";
import "./Profile.scss";
import ProfileSettingsIcon from "../../../../components/Svgs/ProfileSettingsIcon";
import ProfileSettings from "../../../../components/ProfileSettings/ProfileSettings";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { UserType } from "../../../../redux/features/userSlice";

const Profile = ({ user }: { user: UserType }) => {
  const [showSettings, setShowSettings] = useState(false);
  const closeSettings = () => {
    setShowSettings(false);
  };
  const ref = useOutsideClick(() => {
    closeSettings();
  });

  return (
    <div className="profileContainer">
      <div className="avatar">
        <img src={user.avatar} alt="avatar"></img>
      </div>
      <div className="nameContainer">
        <span className="text">Profile</span>
        <h2 className="title1">{user.name}</h2>
      </div>
      <div
        className="profileSettings"
        ref={ref as LegacyRef<HTMLDivElement> | undefined}
      >
        <ProfileSettingsIcon onClick={() => setShowSettings(!showSettings)} />
        {showSettings && <ProfileSettings />}
      </div>
    </div>
  );
};

export default Profile;
