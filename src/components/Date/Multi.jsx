import React, { useState } from "react";
import Render from "./Render";

const Mulit = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    return (
        <div>
            <Render 
                selectedDate={startDate} 
                onChange={setStartDate} 
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜를 선택하세요!"
            />
            ~
            <Render 
                selectedDate={endDate} 
                onChange={setEndDate} 
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜를 선택하세요!"
            />
        </div>
    );
};

export default Mulit;