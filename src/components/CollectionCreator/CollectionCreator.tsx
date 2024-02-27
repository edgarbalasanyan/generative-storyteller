import "./CollectionCreator.scss";
import "../../sass/_typography.scss";
import AddImage from "../Svgs/AddImage";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { addCollection } from "../../redux/features/collectionsSlice";
import { UserType } from "../../redux/features/userSlice";
import { useCreateCollectionMutation } from "../../redux/api/apiSlice/serverApi";
import Button from "../Button/Button";
import "../../sass/_typography.scss";

const CollectionCreator = ({ user }: { user: UserType }) => {
  const imageContainerRef = useRef(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  // const fileInputRef = useRef<null | HTMLInputElement>(null);
  // const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const dispatch = useAppDispatch();
  const [createNewCollection] = useCreateCollectionMutation();
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    // setSelectedFile(null);
    setTitle("");
    setPopupOpen(false);
  };
  // const handleUploadClick = () => {
  //   fileInputRef.current?.click();
  // };
  const createCollection = (title: string) => {
    createNewCollection({ id: user.id, title: title }).then((res): void => {
      if ("data" in res) {
        dispatch(
          addCollection({
            name: title,
            user: user.id,
            stories: [],
            logo: "../../../public/collection.png",
            col_id: res?.data?.col_id,
          })
        );
      }
    });
    closePopup();
  };
  // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target?.files || !e.target?.files[0]) return;

  //   setSelectedFile(e.target.files[0]);
  // };
  return (
    <div className="collectionCreatorContainer">
      <div
        ref={imageContainerRef}
        onClick={openPopup}
        className="collectionCreatorImage"
      >
        <AddImage />
      </div>
      {isPopupOpen && (
        <div className="popupOverlay" onClick={closePopup}>
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            {/* <button onClick={handleUploadClick} className="uploadButton">
              Upload Image
            </button>
            <input
              type="file"
              className="typefile"
              accept=".jpg, .png, .jpeg"
              id="collectionCreatorImage"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            {selectedFile ? (
              <span className="uploadedFile">
                uploaded {selectedFile.name} file
              </span>
            ) : (
              ""
            )} */}
            <label htmlFor="title" className="text text_label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              className="collectionTitleInput"
              placeholder="type collection title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <Button
              text="Create collection"
              onClick={() => {
                if (title.trim()) {
                  createCollection(title);
                }
              }}
            ></Button>
          </div>
        </div>
      )}
      <span className="text text_label">Create new Collection</span>
    </div>
  );
};

export default CollectionCreator;
