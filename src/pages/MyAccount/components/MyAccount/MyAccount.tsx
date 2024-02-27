import Profile from "../Profile/Profile";
import CollectionCreator from "../../../../components/CollectionCreator/CollectionCreator";
import "../../../../sass/_typography.scss";
import "./MyAccount.scss";
import Collection from "../../../../components/Collection/Collection";
import {
  addCollections,
  removeCollection,
} from "../../../../redux/features/collectionsSlice";
import {
  useDeleteCollectionMutation,
  useLazyGetAllStoriesQuery,
  useLazyGetCollectionsQuery,
  useLazyUserQuery,
} from "../../../../redux/api/apiSlice/serverApi";
import { useLayoutEffect, useState } from "react";
import { RootType, useAppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../../redux/features/userSlice";
import { useSelector } from "react-redux";
import Stories from "../../../../components/Stories/Stories";
import {
  StoryType,
  addStory,
  setStories,
} from "../../../../redux/features/StoriesSlice";

export const MyAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getUser] = useLazyUserQuery();
  const [getCollections] = useLazyGetCollectionsQuery();
  const [deleteCollection] = useDeleteCollectionMutation();
  const [showStories, setShowStories] = useState(false);
  const [getAllStories] = useLazyGetAllStoriesQuery({});

  useLayoutEffect(() => {
    const fetchData = async () => {
      const result = await getUser({});
      const collectionsData = await getCollections({});
      dispatch(addCollections({ payload: collectionsData.data }));
      if (result.isSuccess) {
        dispatch(addUser({ ...result.data }));
      } else {
        navigate("/login/signin");
      }
    };
    fetchData();
  }, [getUser, dispatch, navigate, getCollections]);
  const onDelete = (id: number) => {
    deleteCollection(id).then(() => {
      dispatch(removeCollection(id));
    });
  };
  const onImgClick = (id: number) => {
    // getAllStories({}).then((res) => {
    //   dispatch(setStories([]));
    //   res.data.forEach((el: StoryType) => {
    //     if (el.collection === id) {
    //       dispatch(addStory(el));
    //     }
    //   });
    // });
    dispatch(
      setStories([
        {
          st_id: 3,
          collection: 2,
          generated_context: "story",
          name: "new",
          user_input: "user input",
        },
        {
          st_id: 4,
          collection: 2,
          generated_context: "story1",
          name: "newww",
          user_input: "user input",
        },
      ])
    );
  };
  // const stories = useSelector((state: RootType) => state.stories);
  const user = useSelector((state: RootType) => state.user);
  const collections = useSelector(
    (state: RootType) => state.collections.collections
  );
  return (
    <div className="myAccountContainer">
      <Profile user={user}></Profile>
      <div className="myAccountBody">
        <div className="title2 ">My Collections</div>
        <div className="collections">
          <CollectionCreator user={user} />
          {collections.map((collection) => {
            return (
              <Collection
                id={collection.col_id!}
                title={collection.name}
                key={collection.col_id}
                onDelete={() => {
                  onDelete(collection.col_id!);
                }}
                onImgClick={() => {
                  onImgClick(collection.col_id!);
                }}
              />
            );
          })}
        </div>
      </div>
      {/* {showStories && (
        <Stories
          onClose={() => {
            setShowStories(false);
          }}
        />
      )} */}
    </div>
  );
};
