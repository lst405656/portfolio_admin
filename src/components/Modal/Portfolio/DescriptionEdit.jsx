import Modal from "../Render"

const DescriptionEdit = ({ isOpen, value, onChange, onSave, onClose }) => (
    <Modal
        isOpen={isOpen} onClose={onClose}
    >
        <h3>설명 수정</h3>
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={6}
        ></textarea>

        <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <button onClick={onClose}>취소</button>
            <button onClick={onSave}>저장</button>
        </div>
    </Modal>
);

export default DescriptionEdit;