import React from "react";
import ReactDOM from "react-dom";
import "../../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {

    //닫혀있으면 종료
    if(!isOpen){
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default Modal;