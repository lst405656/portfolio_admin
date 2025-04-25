import React, { useState } from "react";
// import Grid from "../../components/Grid";
// import Table from "../../components/Gird/Table";
import CheckTable from "../../components/Gird/CheckboxTable";
import "../../styles/PortfolioList.css";

function PortfolioList() {
    const [items, setItems] = useState([
        {
            id: {
                value: "1"
            },
            title: {
                value: "프로젝트 A",
                option: {
                    type: "link",
                    href: "/portfolio/detail?index=1"
                }
            }
        },
        {
            id: {
                value: "2"
            },
            title: {
                value: "프로젝트 B",
                option: {
                    type: "link",
                    href: "/portfolio/detail?index=2"
                }
            }
        },
        {
            id: {
                value: "3"
            },
            title: {
                value: "프로젝트 C",
                option: {
                    type: "link",
                    href: "/portfolio/detail?index=3"
                }
            }
        },
        {
            id: {
                value: "4"
            },
            title: {
                value: "프로젝트 D",
                option: {
                    type: "link",
                    href: "/portfolio/detail?index=4"
                }
            }
        },
        {
            id: {
                value: "5"
            },
            title: {
                value: "프로젝트 E",
                option: {
                    type: "link",
                    href: "/portfolio/detail?index=5"
                }
            }
        }
    ]);

    const columns = [
        { key: "id", label: "ID" },
        { key: "title", label: "제목" }
    ];

    const [selectedItems, setSelectedItems] = useState([]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [searchTerm, setSearchTerm] = useState("");
    // const itemsPerPage = 10;

    // const filteredItems = items.filter((item) =>
    //     item.title.value.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const selectedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
    // const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="portfolio-container">
            <h1>📊 포트폴리오 페이지</h1>
            <CheckTable
                className={"portfolio"}
                type={"table"}
                columns={columns}
                data={items}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                ></CheckTable>
        </div>
    );
}

export default PortfolioList;