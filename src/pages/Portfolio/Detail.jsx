import React, { useState } from 'react';
import "../../styles/PortfolioDetail.css";

const PortfolioDetail = (props) => {
    const [isEditing, setIsEditing] = useState({
        description: false,
        responsibilities: false,
        techStack: false
    });

    const [editedData, setEditedData] = useState({
        description: props.description,
        responsibilities: props.responsibilities,
        techStack: props.techStack
    });

    const handleEditToggle = (key) => {
        setIsEditing((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleChange = (key, value) => {
        setEditedData((prev) => ({
            ...prev,
            [key]: value
        }));
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

            <h1>{props.title}</h1>
            <p className="meta">{props.period}</p>

            <div className="section">
                <h2>설명
                    <button onClick={() => handleEditToggle("description")}>+</button>
                </h2>
                {isEditing.description ? (
                    <textarea
                        value={editedData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                ) : (
                    <p>{editedData.description}</p>
                )}
            </div>

            <div className="section">
                <h2>주요 업무 및 역할
                    <button onClick={() => handleEditToggle("responsibilities")}>+</button>
                </h2>
                {isEditing.responsibilities ? (
                    <textarea
                        value={editedData.responsibilities.join("\n")}
                        onChange={(e) =>
                            handleChange("responsibilities", e.target.value.split("\n"))
                        }
                    />
                ) : (
                    <ul>
                        {editedData.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="section">
                <h2>사용 도구 및 기술
                    <button onClick={() => handleEditToggle("techStack")}>+</button>
                </h2>
                {isEditing.techStack ? (
                    <textarea
                        value={editedData.techStack.join("\n")}
                        onChange={(e) =>
                            handleChange("techStack", e.target.value.split("\n"))
                        }
                    />
                ) : (
                    <ul className="tech-stack">
                        {editedData.techStack.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                )}
            </div>

            {props.outcome && (
                <div className="section">
                    <h2>성과</h2>
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
        </div>
    );
};

export default PortfolioDetail;
