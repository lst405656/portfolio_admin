import { useRef, useEffect } from "react";
import Render from "./Render";

function CheckboxTableGrid({
    className,
    columns,
    data,
    selectedItems,
    setSelectedItems,
    events = {}
}) {
    const isAllSelected = selectedItems.length === data.length;
    const headerCheckboxRef = useRef(null);

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedItems.length > 0 && selectedItems.length < data.length;
        }
    }, [selectedItems, data]);

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedItems(isAllSelected ? [] : data.map((item) => item.id.value));
    };

    const renderRow = (item, rowIndex) => (
        <tr
            key={rowIndex}
            onClick={() => events.onRowClick?.(item, rowIndex)}
        >
            <td>
                <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id.value)}
                    onChange={() => handleSelect(item.id.value)}
                    onClick={(e) => e.stopPropagation()} //row 클릭 방지
                />
            </td>
            {columns.map((col, colIndex) => (
                <td
                    key={colIndex}
                    onClick={(e) => {
                        e.stopPropagation(); //row click 방지
                        events.onCellClick?.(item, col, rowIndex, colIndex);
                    }}
                >
                    {item[col.key].value}
                </td>
            ))}
        </tr>
    );

    const modifiedData = data.map((item, index) => ({
        ...item,
        index
    }));

    return (
        <table className={className}>
            <thead>
                <tr>
                    <th>
                        <input
                            ref={headerCheckboxRef}
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                        />
                    </th>
                    {columns.map((col, index) => (
                        <th key={index}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <Render data={modifiedData} renderRow={renderRow} />
            </tbody>
        </table>
    );
}

export default CheckboxTableGrid;