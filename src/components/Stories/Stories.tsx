import { useState } from "react";
import "./Stories.scss";
import "../Story/Story.scss";
import { useSelector } from "react-redux";
import { RootType } from "../../redux/store";
import Story from "../Story/Story";
import StoriesSettings from "./components/Settings/StoriesSettings";
const Stories = ({ onClose }: { onClose: () => void }) => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const stories = useSelector((state: RootType) => state.stories.stories);
  const handleTitleClick = (id: number) => {
    setSelectedStory(id === selectedStory ? null : id);
  };
  const renderStories = () => {
    if (stories.length) {
      return stories.map((story, index) => {
        return (
          <div key={story.st_id} className="storyTitle">
            <h3
              className="title3"
              onClick={() => handleTitleClick(story.st_id!)}
            >
              {++index + ". " + story.name}
            </h3>
            <StoriesSettings id={story.st_id}/>
          </div>
        );
      });
    } else {
      return <h3 className="title3">no stories in collection</h3>;
    }
  };
  return (
    <div className="stories">
      {!selectedStory ? (
        <>
          <div className="storiesHeader">
            <h2 className="title2">Stories</h2>
            <img
              src="../../../public/Close.png"
              alt="close icon"
              width="20px"
              height="20px"
              onClick={onClose}
            />
          </div>
          {renderStories()}
        </>
      ) : (
        <Story id={selectedStory!} closeStory={() => setSelectedStory(null)} />
      )}
    </div>
  );
};

export default Stories;
