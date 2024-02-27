import "./Modal.scss";
import "../../sass/_typography.scss";
import Close from "../Svgs/Close";

const Modal = ({
  children,
  onClose,
  onSubmit,
}: {
  children: React.ReactNode[];
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form className="modalContainer" onSubmit={onSubmit}>
          {children}
        </form>
        <div onClick={onClose} className="closeModal">
          <Close />
        </div>
      </div>
    </div>
  );
};

export default Modal;
