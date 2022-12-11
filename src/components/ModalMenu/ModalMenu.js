import "./ModalMenu.scss";
import Modal from "react-modal";
import Session from "../Session/Session";

import tumbleweedImage from "../../assets/images/tumbleweed.png";

Modal.setAppElement("#root");

const ModalMenu = ({ isOpen, handleCloseModal, usersArr }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Upload Success Modal"
      className="modal-menu"
      overlayClassName="modal-menu__overlay"
    >
      <div className={`modal-menu__container`}>
        <h2 className="modal-menu__title">Active Sessions</h2>

        {usersArr.length === 0 ? (
          <>
            <img
              className="modal-menu__empty-list"
              src={tumbleweedImage}
              alt="Tumbleweed"
            />
            <h3 className="modal-menu__empty-text">It's quiet...</h3>
          </>
        ) : (
          usersArr.map((session, index) => {
            return <Session key={index} name={session} />;
          })
        )}
      </div>
    </Modal>
  );
};

export default ModalMenu;
