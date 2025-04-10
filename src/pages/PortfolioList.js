import React, { useState } from "react";
import Grid from "../components/Grid";
import "../styles/PortfolioList.css";

function PortfolioList() {
    const [items, setItems] = useState([
        { id: 1, title: "프로젝트 A", description: "설명 A" },
        { id: 2, title: "프로젝트 B", description: "설명 B" },
        { id: 3, title: "프로젝트 C", description: "설명 C" },
        { id: 4, title: "프로젝트 D", description: "설명 D" },
        { id: 5, title: "프로젝트 E", description: "설명 E" },
    ]);

    const columns = [
        { key: "id", label: "ID" },
        { key: "title", label: "제목" },
        { key: "description", label: "설명" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="portfolio-container">
            <h1>📊 포트폴리오 페이지</h1>
            <Grid type={"table"} columns={columns} data={items} ></Grid>
        </div>
    );
}

export default PortfolioList;