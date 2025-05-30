import React, { useState, useEffect } from "react";
import CheckTable from "../../components/Gird/CheckboxTable";
import Detail from "../../pages/Portfolio/Detail";
import { supabaseAPI } from "../../supabaseClient";
import "../../styles/PortfolioList.css";

function PortfolioList() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const defaultInsertData = {
		title: { value: "제목을 입력하세요." },
		period: { value: "기간을 입력하세요." },
		description: { value: "설명을 입력하세요." },
		responsibilities: { value: [] },
		techStack: { value: [] },
		outcome: { value: "결과를 입력하세요." },
		files: { value: [] }
	}

	//Supabase에서 데이터 불러오기
	const fetchData = async () => {
		try{
			const data = await supabaseAPI.getList("portfolio",
			`
				id,
				title,
				startDate,
				endDate,
				description,
				outcome,
				tech_stack (
					tech
				),
				responsibilities (
					responsibility
				)
			`);

			if (!data) {
				throw new Error("데이터를 가져오지 못했습니다.");
			}
			const formatDate = (dateString) => new Date(dateString).toISOString().split("T")[0];

			const formattedData = data.map((item, index) => ({
				title: { value: item.title, option: { type: "link", href: `/portfolio/detail?index=${index + 1}` } },
				period: { value: `${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}` },
				startDate: { value: formatDate(item.startDate) },
				endDate: { value: formatDate(item.endDate) },
				description: { value: item.description },
				responsibilities: { value: item.responsibilities.map(r => r.responsibility) },
				techStack: { value: item.tech_stack.map(t => t.tech) },
				outcome: { value: item.outcome },
				files: { value: [] }
			}));

			setItems(formattedData);
			setLoading(false);

		}catch(error){
			console.error("🚨 데이터 로딩 중 오류 발생:", error);
			setLoading(false);
		}

	};

	useEffect(() => {
		fetchData();
	}, []);

	const columns = [
		{ key: "title", label: "제목" },
		{ key: "period", label: "기간" }
	];

	const [selectedItems, setSelectedItems] = useState([]);
	const [isDetailVisible, setIsDetailVisible] = useState(null);
	const [animationState, setAnimationState] = useState("");

	const events = {
		onCellClick: (item, col, rowIndex, conIndex) => {
			if (isDetailVisible && isDetailVisible.index === rowIndex && animationState === "show") {
				closeDetail();
			} else {
				openDetail(item, rowIndex);
			}
		},
	};

	const openDetail = (value, rowIndex) => {
		setIsDetailVisible({ value: value, index: rowIndex });
		setAnimationState("show");
	};

	const closeDetail = () => {
		setAnimationState("hide");
	};

	if (loading) return <p>⏳ 로딩 중...</p>;

	return (
		<div className="portfolio-container">
			<div className="portfolio-list">
				<h1>📊 포트폴리오 페이지
					<button onClick={() => openDetail(defaultInsertData, "")}>+</button>
				</h1>
				<CheckTable
					className={"portfolio"}
					type={"table"}
					columns={columns}
					data={items}
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					events={events}
				/>
			</div>

			{isDetailVisible && (
				<Detail
					className={animationState}
					onAnimationEnd={() => {
						if (animationState === "hide") {
							setIsDetailVisible(null);
						}
					}}
					onClose={closeDetail}
					title={isDetailVisible.value.title.value}
					startDate={isDetailVisible.value.startDate.value}
					endDate={isDetailVisible.value.endDate.value}
					description={isDetailVisible.value.description.value}
					responsibilities={isDetailVisible.value.responsibilities.value}
					techStack={isDetailVisible.value.techStack.value}
					outcome={isDetailVisible.value.outcome.value}
					files={isDetailVisible.value.files.value}
				/>
			)}
		</div>
	);
}

export default PortfolioList;