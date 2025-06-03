import React, { useState } from 'react';
import Modal from "../Render";
import "../../../styles/ResponsibilitiesEdit.css"

//TODO: 스타일 수정필요
const TechStackEdit = ({ isOpen, value, onSave, onClose }) => {

    const [ techStack, setTechStack ] = useState(value || []);

    //내용이 바뀌면 배열 내 해당 인덱스 값 업데이트
    const handleInputChange = (e, index) => {
        const newArray = [...techStack];
        newArray[index] = e.target.value;
        setTechStack(newArray);
    };

    //저장시 부모요소로 데이터 전달
    const handleSave = () => {
        onSave(techStack);
        onClose();
    };

    //해당 인덱스 항목 제거
    const handleRemoveItem = (index) => {
        const newArray = [];

        for(let i = 0; i < techStack.length; i++){

            //해당 인덱스일 경우 제외
            if(i === index){
                continue;
            }
            newArray.push(techStack[i]);
        }
        setTechStack(newArray);
    };

    //새로운 항목 추가
    const handleAddItem = () => {
        setTechStack([...techStack, "새 기술"]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>사용 도구 및 기술 수정</h3>
      
            <div className="responsibilities-container">
                {techStack.map((item, index) => (
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
                    <button onClick={handleSave} className="save-btn">저장</button>
                </div>
        </div>
        </Modal>
    );
};

export default TechStackEdit;