import Modal from "../Render"

const TitleEdit = ({ isOpen, value, onChange, onSave, onClose }) => (
    <Modal
        isOpen={isOpen} onClose={onClose}
    >
        <h3>제목 수정</h3>
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
        />

        <div className="action-buttons">
            <button onClick={onClose} className="cancel-btn">취소</button>
            <button onClick={onSave} className="save-btn">저장</button>
        </div>
    </Modal>
);

export default TitleEdit;