import { useState } from "react";
import Render from "./Render";

const Multi = ({start, end}) => {
    const [startDate, setStartDate] = useState(start || new Date());
    const [endDate, setEndDate] = useState(end || new Date());
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

export default Multi;