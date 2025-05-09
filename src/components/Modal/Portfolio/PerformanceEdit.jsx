import Modal from "../Render"

const DescriptionEdit = ({ isOpen, value, onChange, onSave, onClose }) => (
    <Modal
        isOpen={isOpen} onClose={onClose}
    >
        <h3>성과 수정</h3>
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={6}
        ></textarea>

        <div className="action-buttons">
            <button onClick={onClose} className="cancel-btn">취소</button>
            <button onClick={onSave} className="save-btn">저장</button>
        </div>
    </Modal>
);

export default DescriptionEdit;