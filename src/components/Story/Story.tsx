import { LegacyRef, useEffect, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./Story.scss";
import { useLazyGetStoryQuery } from "../../redux/api/apiSlice/serverApi";
import Button from "../Button/Button";

type StoryType = {
  name: string;
  generated_context: string;
};

const Story = ({
  id,
  closeStory,
  showButton = true,
}: {
  id: number;
  closeStory?: () => void;
  showButton?: boolean;
}) => {
  const ref = useOutsideClick(() => {
    closeStory?.();
  });
  const [getStory] = useLazyGetStoryQuery({});
  const [story, setStory] = useState<StoryType>();

  useEffect(() => {
    getStory(id).then((res) => setStory(res.data));
  }, [getStory, id]);
  return (
    <div className="story" ref={ref as LegacyRef<HTMLDivElement> | undefined}>
      <div className="storyHeader">
        <h2 className="title2">{story?.name}</h2>
      </div>
      <p className="text">{story?.generated_context}</p>
      {showButton && <Button text="back" onClick={closeStory} />}
    </div>
  );
};

export default Story;
