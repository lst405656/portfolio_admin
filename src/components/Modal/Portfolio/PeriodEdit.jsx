import Modal from "../Render";
import Multi from "../../Date/Multi";

const DescriptionEdit = ({ isOpen, value, onChange, onSave, onClose }) => (
    <Modal
        isOpen={isOpen} onClose={onClose}
    >
        <h3>기간 수정</h3>
        <Multi
            start={value.startDate}
            end={value.endDate}
        >
        </Multi>

        <div className="action-buttons">
            <button onClick={onClose} className="cancel-btn">취소</button>
            <button onClick={onSave} className="save-btn">저장</button>
        </div>
    </Modal>
);

export default DescriptionEdit;