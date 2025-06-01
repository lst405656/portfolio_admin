import React, { useEffect, useState } from 'react';
import PortfolioModal from "../../components/Modal/Portfolio/index";
import { supabaseAPI } from "../../supabaseClient";
import "../../styles/PortfolioDetail.css";

const saveData = async(data) => {

    const convertTech = data.techStack.map(tech => ({
        portfolio_id: data.idx,
        tech: tech 
    }));

    const convertResponse = data.responsibilities.map(responsibility => ({
        portfolio_id: data.idx,
        responsibility: responsibility 
    }));

    const portfolioData = {
        title: data.title,
        description: data.description,
        outcome: data.outcome,
        startDate: data.startDate,
        endDate: data.endDate
    };

    if(data.type === "insert"){
        await supabaseAPI.setData(
            "portfolio",
            portfolioData
        );

    }else{
        //포트폴리오 수정
        await supabaseAPI.updateData(
            "portfolio",
            portfolioData,
            { id: ['eq', data.idx] }
        );

        //기술 제거 후 생성
        await supabaseAPI.deleteData(
            "tech_stack",
            {
                portfolio_id: ['eq', data.idx]
            }
        );
    
        //기술 제거 후 생성
        await supabaseAPI.deleteData(
            "responsibilities",
            {
                portfolio_id: ['eq', data.idx]
            }
        );        
    }

    await supabaseAPI.setData(
        "tech_stack",
        convertTech
    );

    await supabaseAPI.setData(
        "responsibilities",
        convertResponse
    );

};

const PortfolioDetail = (props) => {
    const [editKey, setEditKey] = useState(null);

    const openEditModal = (key) => setEditKey(key);
    const closeEditModal = () => setEditKey(null);

    const [editedData, setEditedData] = useState({
        idx: props.idx,
        title: props.title,
        startDate: props.startDate,
        endDate: props.endDate,
        description: props.description,
        responsibilities: props.responsibilities,
        techStack: props.techStack,
        outcome: props.outcome
    });

    useEffect(() => {
        setEditedData({
            idx: props.idx,
            title: props.title,
            startDate: props.startDate,
            endDate: props.endDate,
            description: props.description,
            responsibilities: props.responsibilities,
            techStack: props.techStack,
            outcome: props.outcome
        });
    }, [
        props.idx,
        props.title,
        props.startDate,
        props.endDate,
        props.description,
        props.responsibilities,
        props.techStack,
        props.outcome
    ]);

    const handleChange = (key, value) => {
        setEditedData((prev) => ({
            ...prev,
            [key]: value
        }));
    };
    //TODO: 저장 로직 추가
    const handleSave = async() => {
        try{
            console.log("저장된 데이터:", editedData);
            
            await saveData(editedData);
            alert("포트폴리오가 저장되었습니다!");
            
            props.onClose();
        }catch (error) {
            console.error("저장 중 오류 발생:", error);
        }
    };
    
    const renderModal = () => {
        //값이 없으면 종료
        if(!editKey){
            return;
        }
        const currentValue = editedData[editKey];
        const commonProps = {
            isOpen: editKey !== null,
            value: currentValue,
            // onChange: (val) => handleChange(editKey, val),
            onSave: (data) => {
                // 변경된 데이터만 저장
                if (data !== editedData[editKey]) { 
                    handleChange(editKey, data);
                }

                if (editKey === "period"){
                    handleChange("startDate", data.start);
                    handleChange("endDate", data.end);
                }
                closeEditModal();
            },
            onClose: closeEditModal
        };

        switch(editKey){
            case "title":
                return <PortfolioModal.TitleEdit {...commonProps} />;
            case "period":
                commonProps.value = {
                    startDate: editedData.startDate,
                    endDate: editedData.endDate
                }
                return <PortfolioModal.PeriodEdit
                    { ...commonProps }
                />;
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
            <button className="save-button" onClick={handleSave}>💾 저장</button>
            <button
                className="close-button"
                onClick={props.onClose}
                aria-label="닫기"
            >
                ×
            </button>
            {/* 처음 데이터와 다를 경우 저장하시겠습니까 alert 및 닫기시 데이터 초기화 추가 */}
            <div className="section">
                <h1>
                    {editedData.title}
                    <button onClick={() => openEditModal("title")}>+</button>
                </h1>
            </div>
            <div className="section">
                <h2>
                    기간
                    <button onClick={() => openEditModal("period")}>+</button>
                </h2>
                <p className="meta">
                    {editedData.startDate} ~ {editedData.endDate}
                </p>
            </div>
            <div className="section">
                <h2>
                    설명
                    <button onClick={() => openEditModal("description")}>+</button>
                </h2>
                <p>{editedData.description}</p>
            </div>

            <div className="section">
                <h2>주요 업무 및 역할
                    <button onClick={() => openEditModal("responsibilities")}>+</button>
                </h2>
                <ul>
                    {editedData.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>사용 도구 및 기술
                    <button onClick={() => openEditModal("techStack")}>+</button>
                </h2>
                <ul className="tech-stack">
                    {editedData.techStack.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </div>

            {editedData.outcome && (
                <div className="section">
                    <h2>성과
                        <button onClick={() => openEditModal("outcome")}>+</button>
                    </h2>
                    <div className="outcome-highlight">{editedData.outcome}</div>
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