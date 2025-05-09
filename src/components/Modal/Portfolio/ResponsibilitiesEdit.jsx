import React from 'react';
import Modal from "../Render";
import "../../../styles/ResponsibilitiesEdit.css"

const ResponsibilitiesEdit = ({ isOpen, value, onChange, onSave, onClose }) => {

    //내용이 바뀌면 배열 내 해당 인덱스 값 업데이트
    const handleInputChange = (e, index) => {
        const newValue = e.target.value;
        const newArray = [...value];
        newArray[index] = newValue;
        onChange(newArray);
    };

    //해당 인덱스 항목 제거
    const handleRemoveItem = (index) => {
        const newArray = [];

        for(let i = 0; i < value.length; i++){

            //해당 인덱스일 경우 제외
            if(i == index){
                continue;
            }
                newArray.push(value[i]);
        }
        onChange(newArray);
    };

    //새로운 항목 추가
    const handleAddItem = () => {
    const newArray = [...value, ""];
        onChange(newArray);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>주요 업무 수정</h3>
      
            <div className="responsibilities-container">
                {value.map((item, index) => (
                    <div
                        key={index}
                        className="responsibility-item"
                    >
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleInputChange(e, index)}
                            className="responsibility-input"
                        />
                        <button onClick={() => handleRemoveItem(index)} className="remove-btn">-</button>
                    </div>
                ))}
        
                <button onClick={handleAddItem} className="add-btn">추가</button>
                
                <div className="action-buttons">
                    <button onClick={onClose} className="cancel-btn">취소</button>
                    <button onClick={onSave} className="save-btn">저장</button>
                </div>
        </div>
        </Modal>
    );
};

export default ResponsibilitiesEdit;