import { LegacyRef, useState } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import SettingDots from "../../../Svgs/SettingsDots";
import "./StoriesSettings.scss";
import EditStory from "../../../EditStory/EditStory";
import { useDeleteStoryMutation } from "../../../../redux/api/apiSlice/serverApi";
import { useAppDispatch } from "../../../../redux/store";
import { removeStory } from "../../../../redux/features/StoriesSlice";

const StoriesSettings = ({ id }: { id: number }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const ref = useOutsideClick(() => {
    setOpenSettings(false);
  });
  const [deleteStory] = useDeleteStoryMutation();
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        ref={ref as LegacyRef<HTMLDivElement> | undefined}
        className="storiesSettings"
      >
        <div
          className="settingsDotsContainer"
          onClick={() => {
            setOpenSettings(!openSettings);
          }}
        >
          <SettingDots />
        </div>
        {openSettings && (
          <ul className="storySettings">
            <li
              className="text text_label"
              onClick={() => setOpenEdit(!openEdit)}
            >
              Edit
            </li>
            <li
              className="text text_label"
              onClick={() => {
                deleteStory({ id });
                dispatch(removeStory(id));
              }}
            >
              Delete
            </li>
          </ul>
        )}
      </div>
      {openEdit && <EditStory id={id} closeEdit={() => setOpenEdit(false)} />}
    </>
  );
};

export default StoriesSettings;
