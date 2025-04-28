import { useState } from "react";
import BaseGrid from "./Base";
import { Link } from "react-router-dom";

function CheckboxTableGrid({ className, columns, data, selectedItems, setSelectedItems, onItemClick }) {
    const isAllSelected = selectedItems.length === data.length;

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedItems(isAllSelected ? [] : data.map((item) => item.id.value));
    };

    const renderRow = (item, rowIndex) => (
        <tr key={rowIndex}>
            <td>
                <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id.value)}
                    onChange={() => handleSelect(item.id.value)}
                />
            </td>
            {columns.map((col, colIndex) => {
                return <td key={colIndex}>{item[col.key].value}</td>;
            })}
        </tr>
    );

    return (
        <BaseGrid
            className={className}
            columns={[{ key: "select", label: <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} /> }, ...columns]}
            data={data}
            renderRow={renderRow}
        />
    );
}

export default CheckboxTableGrid;