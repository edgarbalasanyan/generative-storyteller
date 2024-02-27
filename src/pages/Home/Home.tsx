import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
// import CreateStoryModal from "../../components/CreateStoryModal/CreateStoryModal";
import Story from "../../components/Story/Story";
import BigStoryCard from "../../components/StoryCards/BigStoryCard/BigStoryCard";
import MidStoryCard from "../../components/StoryCards/MidStoryCard/MidStoryCard";
import SmallStoryCard from "../../components/StoryCards/SmallStoryCard/SmallStoryCard";
import "../../sass/_variables.scss";
import "./Home.scss";
import { useState } from "react";

const Home = () => {
  // const [showModal, setShowModal] = useState(false);
  const [storyId, setStoryId] = useState<number>();

  // const closeModal = () => {
  //   setShowModal(false);
  // };
  const navigate = useNavigate();
  return (
    <>
      {storyId && (
        <Story
          id={storyId}
          closeStory={() => {
            setStoryId(undefined);
          }}
        />
      )}
      <div className="homePage">
        <img src="../../../public/Title.png" alt="Start creating your story" />
        <div>
          <Button text="Click here to start" onClick={()=>{navigate("/create-story")}} />
        </div>
        {/* {showModal && <CreateStoryModal closeModal={closeModal} />} */}
        <div className="popularStories">
          <div className="storiesColumn">
            <BigStoryCard
              image="../../../public/storyCardBig.png"
              onClick={() => {
                setStoryId(1);
              }}
            />
            <SmallStoryCard
              onClick={() => {
                setStoryId(10);
              }}
              image="../../../public/storyCardSmall.png"
            />
            <MidStoryCard
              onClick={() => {
                setStoryId(7);
              }}
              image="../../../public/storyCardMid2.png"
            />
          </div>
          <div className="storiesColumn">
            <MidStoryCard
              onClick={() => {
                setStoryId(8);
              }}
              image="../../../public/storyCardMid1.png"
            />
            <BigStoryCard
              image="../../../public/storyCardBig1.png"
              onClick={() => {
                setStoryId(3);
              }}
            />
            <SmallStoryCard
              onClick={() => {
                setStoryId(11);
              }}
              image="../../../public/storyCardSmall2.png"
            />
          </div>
          <div className="storiesColumn thirdColumn">
            <BigStoryCard
              image="../../../public/storyCardBig2.png"
              onClick={() => {
                setStoryId(4);
              }}
            />
            <MidStoryCard
              onClick={() => {
                setStoryId(9);
              }}
              image="../../../public/storyCardMid.png"
            />
            <SmallStoryCard
              onClick={() => {
                setStoryId(12);
              }}
              image="../../../public/storyCardSmall3.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
