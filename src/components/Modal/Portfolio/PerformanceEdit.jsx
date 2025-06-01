import { useState } from "react";
import Modal from "../Render"

const PerformanceEdit = ({ isOpen, value, onSave, onClose }) => {
    const [ performance, setPerformance ] = useState(value || "");
    return (
        <Modal
            isOpen={isOpen} onClose={onClose}
        >
            <h3>성과 수정</h3>
            <textarea
                value={performance}
                onChange={e => setPerformance(e.target.value)}
                rows={6}
            ></textarea>

            <div className="action-buttons">
                <button onClick={onClose} className="cancel-btn">취소</button>
                <button onClick={() => onSave(performance)} className="save-btn">저장</button>
            </div>
        </Modal>
    );
};
export default PerformanceEdit;