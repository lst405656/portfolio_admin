import { useState } from "react";
import Modal from "../Render"

const DescriptionEdit = ({ isOpen, value, onSave, onClose }) => {
    const [ description, setDescription ] = useState(value || "");
    return (
        <Modal
            isOpen={isOpen} onClose={onClose}
        >
            <h3>설명 수정</h3>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={6}
            ></textarea>

            <div className="action-buttons">
                <button onClick={onClose} className="cancel-btn">취소</button>
                <button onClick={() => onSave(description)} className="save-btn">저장</button>
            </div>
        </Modal>
    );
};

export default DescriptionEdit;