function BaseGrid({ className, columns, data, renderRow }) {
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
                {data.map((item, rowIndex) => renderRow(item, rowIndex))}
            </tbody>
        </table>
    );
}

export default BaseGrid;