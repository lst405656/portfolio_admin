import React, { useState } from 'react';
import PortfolioModal from "../../components/Modal/Portfolio/index";
import "../../styles/PortfolioDetail.css";

const PortfolioDetail = (props) => {
    const [editKey, setEditKey] = useState(null);

    const openEditModal = (key) => setEditKey(key);
    const closeEditModal = () => {
        setEditKey(null);
    };

    const [editedData, setEditedData] = useState({
        description: props.description,
        responsibilities: props.responsibilities,
        techStack: props.techStack,
        outcome: props.outcome
    });

    const handleChange = (key, value) => {
        setEditedData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = async(key, value) => {
        try{
            handleChange(key, value);
            closeEditModal();

        }catch{
            
        }
    };
    
    const renderModal = () => {

        //값이 없으면 종료
        if(!editKey){
            return;
        }
        const currentValue = props[editKey];
        const commonProps = {
            isOpen: true,
            value: currentValue,
            onChange: (val) => handleChange(editKey, val),
            onSave: (data) => handleSave(editKey, data),
            onClose: closeEditModal
        };

        switch(editKey){
            case "title":
                return <PortfolioModal.DescriptionEdit {...commonProps} />;
            case "period":
                return <PortfolioModal.DescriptionEdit {...commonProps} />;
            case "description":
                return <PortfolioModal.DescriptionEdit {...commonProps} />;
            case "responsibilities":
                return <PortfolioModal.ResponsibilitiesEdit {...commonProps} />;
            case "techStack":
                return <PortfolioModal.TechStackEdit {...commonProps} />;
            case "outcome":
                return <PortfolioModal.PerformanceEdit {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <div className={`portfolio-detail ${props.className}`}>
            <button
                className="close-button"
                onClick={props.onClose}
                aria-label="닫기"
            >
                ×
            </button>

            <h1>
                {props.title}
                <button onClick={() => openEditModal("title")}>+</button>
            </h1>
            <p className="meta">
                {props.period}
                <button onClick={() => openEditModal("period")}>+</button>
            </p>
            <div className="section">
                <h2>
                    설명
                    <button onClick={() => openEditModal("description")}>+</button>
                </h2>
                <p>{props.description}</p>
            </div>

            <div className="section">
                <h2>주요 업무 및 역할
                    <button onClick={() => openEditModal("responsibilities")}>+</button>
                </h2>
                <ul>
                    {props.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>사용 도구 및 기술
                    <button onClick={() => openEditModal("techStack")}>+</button>
                </h2>
                <ul className="tech-stack">
                    {props.techStack.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </div>

            {props.outcome && (
                <div className="section">
                    <h2>성과
                        <button onClick={() => openEditModal("outcome")}>+</button>
                    </h2>
                    <div className="outcome-highlight">{props.outcome}</div>
                </div>
            )}

            {props.files && props.files.length > 0 && (
                <div className="section">
                    <h2>관련 파일</h2>
                    {props.files.map((file, index) => (
                        <div className="file-item" key={index}>
                            <img src={file.icon} alt="" />
                            <div className="file-meta">
                                <a href={file.link} target="_blank" rel="noopener noreferrer">
                                    {file.name}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {renderModal()}
        </div>
    );
};

export default PortfolioDetail;
