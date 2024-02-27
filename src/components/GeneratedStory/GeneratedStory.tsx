import { useParams } from "react-router-dom";
import Story from "../Story/Story";
import "./GeneratedStory.scss";

const GeneratedStory = () => {
  const { id } = useParams();
  if (!id) return;
  return (
    <div className="generatedStory">
      <Story id={+id} showButton={false} />;
    </div>
  );
};

export default GeneratedStory;
