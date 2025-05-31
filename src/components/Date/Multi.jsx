import { useEffect, useState } from "react";
import Render from "./Render";

const Multi = ({start, end, startHeader, endHeader, onChange }) => {
    const [rangeDate, setRangeDate] = useState({
        start: start || null,
        end: end || null,
    });

    const handleDateChange  = (key, date) => {
        setRangeDate((prev) => {
            const updatedRange = { ...prev, [key]: date};

            //끝 날짜가 더 크면 종료        
            if(updatedRange.start > updatedRange.end){
                updatedRange.end = updatedRange.start;
            }

            onChange(updatedRange);
            return updatedRange;
        });
    };

    useEffect(() => {
        onChange(rangeDate);
    }, [rangeDate]);

    return (
        <div>
            {startHeader}
            <Render 
                selectedDate={rangeDate.start} 
                onChange={(date) => handleDateChange("start", date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요!"
            />
            {endHeader}
            <Render 
                selectedDate={rangeDate.end} 
                onChange={(date) => handleDateChange("end", date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요!"
            />
        </div>
    );
};

export default Multi;