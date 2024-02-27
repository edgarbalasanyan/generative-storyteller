import "./EditStory.scss";
import { useForm } from "react-hook-form";
import Close from "../Svgs/Close";
import { useAppSelector } from "../../redux/store";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Error from "../Svgs/Error";
import { useEditStoryMutation } from "../../redux/api/apiSlice/serverApi";

const EditStory = ({
  id,
  closeEdit,
}: {
  id: number;
  closeEdit: () => void;
}) => {
  const stories = useAppSelector((state) => state.stories.stories);
  const story = stories.find((el) => el.st_id === id) || {
    name: "",
    generated_context: "",
  };
  const [editStory] = useEditStoryMutation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: story.name,
      generated_context: story.generated_context,
    },
  });
  const onSubmit = () => {
    editStory({
      id: id,
      name: getValues("name"),
      generated_context: getValues("generated_context"),
    });
    closeEdit();
  };
  return (
    <div className="editStoryOverlay" onClick={closeEdit}>
      <div
        className="editStoryContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form className="editStoryForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="title2">Edit story</h2>
          <div className="editContent">
            <div className="editAreas">
              <label className="text text_label">Story Title:</label>
              <Input {...register("name", { required: true })} />
              <p
                className={
                  errors.name ? "text_label text_error errors" : "hidden"
                }
              >
                <Error />
                Required
              </p>
              <textarea className="generatedContext"
                style={{ resize: "none", width: "100%" }}
                rows={10}
                {...register("generated_context", { required: true })}
              />
            </div>
            <Button text="Save" />
          </div>
        </form>
        <div className="closeEditStory" onClick={closeEdit}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default EditStory;
