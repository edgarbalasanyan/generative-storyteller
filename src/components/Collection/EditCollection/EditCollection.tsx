import Input from "../../Input/Input";
import Button from "../../Button/Button";
import "./EditCollection.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useRenameCollectionMutation } from "../../../redux/api/apiSlice/serverApi";
import { changeCollectionName } from "../../../redux/features/collectionsSlice";
import Close from "../../Svgs/Close";
import Error from "../../Svgs/Error";

const EditCollection = ({
  id,
  closeEdit,
}: {
  id: number;
  closeEdit: () => void;
}) => {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections.collections);
  const collection = collections.find((el) => el.col_id === id) || { name: "" };
  const [renameCollection] = useRenameCollectionMutation({});
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: collection.name },
  });
  const onSubmit = () => {
    renameCollection({
      id: id,
      newName: getValues("name"),
    });
    dispatch(changeCollectionName({ id: id, name: getValues("name") }));
    closeEdit();
  };
  return (
    <div className="editCollecitonOverlay" onClick={closeEdit}>
      <div
        className="editCollecitonContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form className="editCollecitonForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="editHeader">
            <h2 className="title2">Edit collection</h2>
            <div className="closeEditColleciton" onClick={closeEdit}><Close /></div>
          </div>
          <div className="editContent">
            <div>
              <label className="text text_label">Collection name:</label>
              <Input {...register("name", { required: true })} />
              <p
                className={
                  errors.name ? "text_label text_error errors" : "hidden"
                }
              >
                <Error />
                Required
              </p>
            </div>
            <Button text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollection;
