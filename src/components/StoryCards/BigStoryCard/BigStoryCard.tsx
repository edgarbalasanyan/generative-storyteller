import "./BigStoryCard.scss";
import "../StoryCard.scss";

const BigStoryCard = ({
  image,
  onClick,
}: {
  image: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bigStoryCard storyCard"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default BigStoryCard;
