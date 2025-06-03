import React, { useState, useEffect } from "react";
import CheckTable from "../../components/Gird/CheckboxTable";
import Detail from "../../pages/Portfolio/Detail";
import { supabaseAPI } from "../../supabaseClient";
import "../../styles/PortfolioList.css";

function PortfolioList() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [lastIdx, setLastIdx] = useState(null);

	const defaultInsertData = {
		idx: { value: lastIdx + 1 },
		title: { value: "제목을 입력하세요." },
		period: { value: "기간을 입력하세요." },
		description: { value: "설명을 입력하세요." },
		startDate: { value: null },
		endDate: { value: null },
		responsibilities: { value: [] },
		techStack: { value: [] },
		outcome: { value: "결과를 입력하세요." },
		files: { value: [] },
		type: { value: "insert" }
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
				idx: { value: item.id },
				title: { value: item.title, option: { type: "link", href: `/portfolio/detail?index=${index + 1}` } },
				period: { value: `${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}` },
				startDate: { value: formatDate(item.startDate) },
				endDate: { value: formatDate(item.endDate) },
				description: { value: item.description },
				responsibilities: { value: item.responsibilities.map(r => r.responsibility) },
				techStack: { value: item.tech_stack.map(t => t.tech) },
				outcome: { value: item.outcome },
				files: { value: [] },
				type: { value: "update" }
			}));

			setItems(formattedData);

			if (formattedData.length > 0) {
				setLastIdx(formattedData[formattedData.length - 1].idx.value);
			}

			setLoading(false);

		}catch(error){
			console.error("🚨 데이터 로딩 중 오류 발생:", error);
			setLoading(false);
		}

	};

	const deleteDetail = async () => {
		if (selectedItems.length === 0) {
			alert("삭제할 항목을 선택하세요.");
			return;
		}
		
		try {
			// Supabase에서 삭제 요청 보내기
			console.log(selectedItems);
			const ids = selectedItems.map(item => item.idx.value);

			await supabaseAPI.deleteData(
				"portfolio",
				{ id: ["in", ids] }
			);
			closeDetail();
			alert("선택한 항목이 성공적으로 삭제되었습니다.");
			// 삭제 후 데이터 다시 가져오기
			fetchData();
			setSelectedItems([]); // 선택 항목 초기화
		} catch (error) {
			console.error("🚨 삭제 중 오류 발생:", error);
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
		onCellClick: (item) => {

			if (isDetailVisible && isDetailVisible.value.idx.value === item.idx.value && animationState === "show") {
				closeDetail();
			} else {
				openDetail(item);
			}
		},
	};

	const onUpdate = () => {
		fetchData();
	};

	const openDetail = (value) => {
		
		setIsDetailVisible({ value: value });
		setAnimationState("show");
	};

	const closeDetail = () => {
		setAnimationState("hide");
	};

	if (loading) return <p>⏳ 로딩 중...</p>;

	return (
		<div className="portfolio-container">
			<div className="portfolio-list">
				<h1 className="header">
					<span>📊 포트폴리오 페이지</span>
					<div className="header-buttons">
						<button className="action-button" onClick={() => openDetail(defaultInsertData)}>📄 추가</button>
						<button className="action-button" onClick={deleteDetail}>🗑️ 삭제</button>
					</div>
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
					onUpdate={onUpdate}
					idx={isDetailVisible.value.idx.value}
					title={isDetailVisible.value.title.value}
					startDate={isDetailVisible.value.startDate.value}
					endDate={isDetailVisible.value.endDate.value}
					description={isDetailVisible.value.description.value}
					responsibilities={isDetailVisible.value.responsibilities.value}
					techStack={isDetailVisible.value.techStack.value}
					outcome={isDetailVisible.value.outcome.value}
					files={isDetailVisible.value.files.value}
					type={isDetailVisible.value.type.value}
				/>
			)}
		</div>
	);
}

export default PortfolioList;