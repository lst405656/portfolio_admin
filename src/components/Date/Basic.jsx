import React, { useState } from "react";
import Render from "./Render";

const BasicDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <Render 
            selectedDate={selectedDate} 
            onChange={setSelectedDate} 
            dateFormat="yyyy/MM/dd"
            placeholderText="날짜를 선택하세요!"
        />
    );
};

export default BasicDatePicker;