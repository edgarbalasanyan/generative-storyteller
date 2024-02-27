import { LegacyRef, useState } from "react";
import SettingDots from "../Svgs/SettingsDots";
import "./Collection.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Stories from "../Stories/Stories";
import EditCollection from "./EditCollection/EditCollection";

const Collection = ({
  title,
  id,
  onImgClick,
  onDelete,
}: {
  title: string;
  id: number;
  onImgClick: () => void;
  onDelete: () => void;
}) => {
  const [showStories, setShowStories] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const onSettingsClick = () => {
    setOpenSettings(!openSettings);
  };
  const ref = useOutsideClick(() => {
    setOpenSettings(false);
    console.log("outside settings");
  });
  const storiesRef = useOutsideClick(() => {
    setShowStories(false);
    console.log("outside stories");
  });
  const onEdit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <>
      <div
        ref={storiesRef as LegacyRef<HTMLDivElement> | undefined}
        className="collectionContainer"
      >
        <img
          onClick={() => {
            onImgClick();

            setShowStories(!showStories);
          }}
          src={"../../../public/collection.png"}
          alt="collection image"
          width="180px"
          height="156px"
        ></img>
        <div className="collectionFooter">
          <span className="title3">{title}</span>
          <div ref={ref as LegacyRef<HTMLDivElement> | undefined}>
            <div onClick={onSettingsClick} className="settingsDotsContainer">
              <SettingDots />
            </div>
            {openSettings && (
              <ul className="collectionSettings">
                <li
                  className="text text_label"
                  onClick={() => {
                    onEdit();
                    setOpenSettings(false);
                  }}
                >
                  Edit
                </li>
                <li className="text text_label" onClick={onDelete}>
                  Delete
                </li>
              </ul>
            )}
          </div>
        </div>
        {showStories && (
          <Stories
            onClose={() => {
              setShowStories(false);
            }}
          />
        )}
      </div>
      {openEdit && (
        <EditCollection
          id={id}
          closeEdit={() => {
            setOpenEdit(false);
          }}
        />
      )}
    </>
  );
};

export default Collection;
