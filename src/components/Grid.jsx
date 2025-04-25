
import { Link } from "react-router-dom";
function Grid({ className, type, columns, data }){
    switch(type){
        case "table":
            return (
                <table border="1" className={className}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => {
                                    const cellData = item[col.key];
                                    let content;

                                    switch (cellData?.option?.type){
                                        case "link":
                                            content = cellData.option.href.startsWith("/") ? (
                                                <Link to={cellData.option.href}>
                                                        {cellData.value}
                                                </Link>
                                            )
                                            :(
                                                <a
                                                    href={cellData.option.href}
                                                    target={cellData.option.target || "_self"}
                                                    rel="noopener noreferrer"
                                                >
                                                    {cellData.value}
                                                </a>
                                            );
                                            break;
                                        default:
                                            content = cellData.value;
                                            break;
                                    }
                                    return <td key={colIndex}>{content}</td>
                            })}
                            </tr>
                        ))}
                    </tbody>

                </table>
            );
        default:
            return <p>지원되지 않는 타입입니다.</p>
    }
}

export default Grid;