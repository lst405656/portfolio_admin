import { useState } from "react";
import Modal from "../Render"

const TitleEdit = ({ isOpen, value, onSave, onClose }) => {
    
    const [title, setTitle] = useState(value || "");
    return (
        <Modal
            isOpen={isOpen} onClose={onClose}
        >
            <h3>제목 수정</h3>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <div className="action-buttons">
                <button onClick={onClose} className="cancel-btn">취소</button>
                <button onClick={() => onSave(title)} className="save-btn">저장</button>
            </div>
        </Modal>
    );
};

export default TitleEdit;