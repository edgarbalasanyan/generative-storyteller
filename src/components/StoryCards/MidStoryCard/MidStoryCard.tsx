import "./MidStoryCard.scss";
import "../StoryCard.scss";

const MidStoryCard = ({
  onClick,
  image,
}: {
  onClick: () => void;
  image: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="midStoryCard storyCard"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default MidStoryCard;
