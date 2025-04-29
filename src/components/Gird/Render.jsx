function Render({ data, renderRow }) {
    return (
        <>
            {data.map((item, index) => renderRow(item, index))}
        </>
    );
}

export default Render;