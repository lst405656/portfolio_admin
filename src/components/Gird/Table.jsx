import Render from "./Render";
import { Link } from "react-router-dom";

function TableGrid({ className, columns, data }) {
    const renderRow = (item, rowIndex) => (
        
        <tr key={rowIndex}>
            {columns.map((col, colIndex) => {
                const cellData = item[col.key];
                let content;

                switch (cellData?.option?.type) {
                    case "link":
                        content = cellData.option.href.startsWith("/") ? (
                            <Link to={cellData.option.href}>{cellData.value}</Link>
                        ) : (
                            <a href={cellData.option.href} target="_blank" rel="noopener noreferrer">
                                {cellData.value}
                            </a>
                        );
                        break;
                    default:
                        content = cellData.value;
                        break;
                }
                return <td key={colIndex}>{content}</td>;
            })}
        </tr>
    );

    return (
        <table className={className}>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <Render data={data} renderRow={renderRow} />
            </tbody>
        </table>
    );
}

export default TableGrid;