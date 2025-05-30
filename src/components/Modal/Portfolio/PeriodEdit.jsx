import Modal from "../Render";
import Multi from "../../Date/Multi";
import { useState } from "react";

const DescriptionEdit = ({ isOpen, value, onSave, onClose }) => {
    const [ period, setPeriod ] = useState({
        start: value.startDate || null,
        end: value.endDate || null
    });

    const handleSave = () => {
        const formatDate = (date) => date ? new Date(date).toISOString().split("T")[0] : "";
        onSave({
            start: formatDate(period.start),
            end: formatDate(period.end)
        });
    }

    return(
        <Modal
            isOpen={isOpen} onClose={onClose}
        >
            <h3>기간 수정</h3>
            <Multi
                start={period.start}
                end={period.end}
                startHeader={<h4>시작 날짜</h4>}
                endHeader={<h4>종료 날짜</h4>}
                onChange={setPeriod}
            >
            </Multi>

            <div className="action-buttons">
                <button onClick={onClose} className="cancel-btn">취소</button>
                <button onClick={handleSave} className="save-btn">저장</button>
            </div>
        </Modal>
    );
};

export default DescriptionEdit;