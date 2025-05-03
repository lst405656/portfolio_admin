import React from 'react';
import "../../styles/PortfolioDetail.css";

const PortfolioDetail = (props) => {
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
                <h2>설명</h2>
                <p>{props.description}</p>
            </div>

            <div className="section">
                <h2>주요 업무 및 역할</h2>
                <ul>
                    {props.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>사용 도구 및 기술</h2>
                <ul className="tech-stack">
                    {props.techStack.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
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
