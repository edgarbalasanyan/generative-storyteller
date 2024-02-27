import "./CreateStory.scss";
import Button from "../Button/Button";
import "../../sass/_typography.scss";
import Input from "../Input/Input";
import { RootType, useAppDispatch } from "../../redux/store";
import {
  useCreateCollectionMutation,
  useGenerateStoryMutation,
  useLazyGetCollectionsQuery,
  useLazyUserQuery,
} from "../../redux/api/apiSlice/serverApi";
import {
  addCollection,
  addCollections,
} from "../../redux/features/collectionsSlice";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/features/userSlice";
import { StoryType } from "../../redux/features/StoriesSlice";

const CreateStory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [getUser] = useLazyUserQuery();
  const [getCollections] = useLazyGetCollectionsQuery();
  const [createNewCollection] = useCreateCollectionMutation();
  const [generateStory] = useGenerateStoryMutation();
  const titleRef = useRef<HTMLInputElement>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const selectedCollectionRef = useRef<HTMLSelectElement>(null);
  useLayoutEffect(() => {
    (async () => {
      const { data: user } = await getUser({});
      const { data: collections } = await getCollections({});
      dispatch(addCollections({ payload: collections }));
      if (user) {
        dispatch(addUser(user));
      } else {
        navigate("/login/signin");
      }
      if (collections.length === 0 && user) {
        createNewCollection({ id: user.id, title: "default collection" }).then(
          (res) => {
            if ("data" in res) {
              dispatch(
                addCollection({
                  name: "default collection",
                  user: user.id,
                  stories: [],
                  logo: "../../../public/collection.png",
                  col_id: res.data.col_id,
                })
              );
            }
          }
        );
      }
    })();
  }, [getUser, dispatch, navigate, getCollections, createNewCollection]);

  const collections = useSelector(
    (state: RootType) => state.collections.collections
  );

  const getTheCollection = () => {
    return collections.find(
      (collection) =>
        collection.col_id === Number(selectedCollectionRef.current?.value)
    )?.col_id;
  };
  return (
    <div className="createStoryModalWrapper">
      <div className="createStoryModal" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="" className="text text_label">
          Story title
        </label>
        <Input placeholder="add title" ref={titleRef} />
        <Input placeholder="what is your story about?" ref={userInputRef} />
        <select ref={selectedCollectionRef} className="selectCollection">
          {collections.map((collection) => (
            <option value={collection.col_id} key={collection.col_id}>
              {collection.name}
            </option>
          ))}
        </select>
        <Button
          disabled={isLoading}
          text={isLoading ? "Loading..." : "Generate story"}
          onClick={() => {
            if (
              titleRef.current?.value.trim() &&
              userInputRef.current?.value.trim()
            ) {
              setIsLoading(true);
              generateStory({
                name: titleRef.current?.value,
                user_input: userInputRef.current?.value,
                collection: getTheCollection(),
              })
                .then((data) => {
                  setIsLoading(false);
                  console.log("theeeeeeeeeeeen",data);
                  // navigate('generated-story/:4')
                  //dispatch(addStory(data))
                })
                .catch((data:StoryType) => {
                  setIsLoading(false);
                  console.log("errrrrrrrrrrrror",data);
                });
              // setTimeout(() => navigate("/generated-story/4"), 3500);
            }
          }}
        ></Button>
        {isLoading && <></>}
      </div>
    </div>
  );
};

export default CreateStory;
