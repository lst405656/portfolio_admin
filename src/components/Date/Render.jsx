import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Render = ({ selectedDate, onChange, ...props }) => {
    return <DatePicker selected={selectedDate} onChange={onChange} {...props} />;
};

export default Render;