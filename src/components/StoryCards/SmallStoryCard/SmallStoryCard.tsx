import "./SmallStoryCard.scss";
import "../StoryCard.scss";

const SmallStoryCard = ({
  onClick,
  image,
}: {
  onClick: () => void;
  image: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="smallStoryCard storyCard"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default SmallStoryCard;
