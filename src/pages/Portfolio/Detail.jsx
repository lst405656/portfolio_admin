import React, { useState } from "react";
import ClassicEditorWrapper from "../../components/Editor/Classic";

import "../../styles/PortfolioDetail.css";

function PortfolioDetail() {
    const [isInsert, setIsInsert] = useState(false);
    const [title, setTitle] = useState("제목");
    const [updateDate, setDate] = useState(new Date().toLocaleDateString());
    const [content, setContent] = useState("이곳에 입력하세요");



    return (
        <div>
            <h2>경력 기술서</h2>

            {isInsert ? (
                //수정
                <>
                    <div>
                        <label>제목:</label>
                        <input></input>
                    </div>
                    <div>
                        <label>수정날짜: </label>
                        <label>{updateDate}</label>
                    </div>
                    <div>
                    </div>
                </>
            ) : (
                //상세보기
                <>
                    <div>
                        <label>제목: </label>
                        <label>{title}</label>
                    </div>
                    <div>
                        <label>수정날짜: </label>
                        <label>{updateDate}</label>
                    </div>
                    <div>
                    <ClassicEditorWrapper></ClassicEditorWrapper>
                    </div>
                </>
            )
            }

        </div>
    );
}

export default PortfolioDetail;