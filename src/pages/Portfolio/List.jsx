import React, { useState, useEffect } from "react";
import CheckTable from "../../components/Gird/CheckboxTable";
import Detail from "../../pages/Portfolio/Detail";
import supabase from "../../supabaseClient";
import "../../styles/PortfolioList.css";

function PortfolioList() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	//Supabase에서 데이터 불러오기
	const fetchData = async () => {
		const { data, error } = await supabase
			.from("portfolio")
			.select(`
				id,
				title,
				period,
				description,
				outcome,
				tech_stack (
					tech
				),
				responsibilities (
					responsibility
				)
			`);

		if (error) {
			console.error("데이터 가져오기 실패:", error.message);
			setFetchError(error.message);
			setLoading(false);
		} else {
			//items 형태로 가공
			const formattedData = data.map((item, index) => ({
				title: { value: item.title, option: { type: "link", href: `/portfolio/detail?index=${index + 1}` } },
				period: { value: item.period },
				description: { value: item.description },
				responsibilities: { value: item.responsibilities.map(r => r.responsibility) },
				techStack: { value: item.tech_stack.map(t => t.tech) },
				outcome: { value: item.outcome },
				files: { value: [] }
			}));
			setItems(formattedData);
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
				setIsDetailVisible({ value: item, index: rowIndex });
				setAnimationState("show");
			}
		},
	};

	const closeDetail = () => {
		setAnimationState("hide");
	};

	if (loading) return <p>⏳ 로딩 중...</p>;
	if (fetchError) return <p>❌ 에러: {fetchError}</p>;

	return (
		<div className="portfolio-container">
			<div className="portfolio-list">
				<h1>📊 포트폴리오 페이지</h1>
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
					period={isDetailVisible.value.period.value}
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