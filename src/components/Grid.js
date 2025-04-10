
function Grid({ type, columns, data }){
    switch(type){
        case "table":
            return (
                <table border="1">
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
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{item[col.key]}</td>
                        ))}
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