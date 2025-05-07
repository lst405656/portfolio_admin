import React, {useState} from "react";
import CheckTable from "../../components/Gird/CheckboxTable";
import Detail from "../../pages/Portfolio/Detail";
import "../../styles/PortfolioList.css";

function PortfolioList() {
	const [items, setItems] = useState([
		{
			title: {value: "FCM 로직 개선"},
			period: {value:"2023.03 ~ 2023.04 (약 1개월)"},
			description: {value: "기존 C# 기반의 푸시 메시지 전송 로직이 각 메시지를 개별 처리하여 속도 저하 문제가 발생하였고, 이를 해결하기 위해 C# 및 Java 기반으로 메시지를 일괄 처리(500개씩) 하는 방식으로 개선하였습니다."},
			responsibilities: {value: [
				"기존 로직 분석 및 병목 지점 도출",
				"C# 및 Java 기반 대량 전송 로직 설계 및 구현",
				"성능 테스트 및 검증 (속도 5배 향상, 자원 사용 30% 감소)",
			]},
			techStack: {value: ["Visual Studio Code", "Git", "C#", "Java"]},
			outcome: {value: "메시지 전송 속도 5배 향상 및 시스템 자원 사용량 30% 감소"},
			files: {value: [
				{icon: "/icons/pdf.png", link: "/docs/FCM_Report.pdf", name: "FCM_Performance_Report.pdf"},
				{icon: "/icons/chart.png", link: "/images/performance_chart.png", name: "성능차트.png"},
			]},
		},
		{
			title: {value: "프로젝트 A"},
			period: {value: "2023.04 ~ 2023.05"},
			description: {value: "여기에 프로젝트 A의 개요를 작성하세요."},
			responsibilities: {value: ["업무1", "업무2", "업무3"]},
			techStack: {value: ["React", "Redux", "Axios"]},
			outcome: {value: "프로젝트 A의 주요 성과를 작성하세요."},
			files: {Value: [{icon: "/icons/doc.png", link: "/docs/A_Docs.pdf", name: "A_Docs.pdf"}]},
		},
		{
			title: {value: "프로젝트 B", option: {type: "link", href: "/portfolio/detail?index=3"}},
			period: {value: "2023.06 ~ 2023.07"},
			description: {value: "프로젝트 B 개요"},
			responsibilities: {value: ["업무1", "업무2"]},
			techStack: {value: ["Vue.js", "Vuex"]},
			outcome: {value: "프로젝트 B 성과"},
			files: {value: []},
		},
		{
			title: {value: "프로젝트 C", option: {type: "link", href: "/portfolio/detail?index=4"}},
			period: {value: "2023.08 ~ 2023.09"},
			description: {value: "프로젝트 C 개요"},
			responsibilities: {value: ["업무1", "업무2", "업무3", "업무4"]},
			techStack: {value: ["Angular", "TypeScript"]},
			outcome: {value: "프로젝트 C 성과"},
			files: {value: []},
		},
		{
			title: {value: "프로젝트 D", option: {type: "link", href: "/portfolio/detail?index=5"}},
			period: {value: "2023.10 ~ 2023.11"},
			description: {value: "프로젝트 D 개요"},
			responsibilities: {value: ["업무1", "업무2"]},
			techStack: {value: ["ASP.NET MVC", "MSSQL"]},
			outcome: {value: "프로젝트 D 성과"},
			files: {value: []},
		},
	]);

	const columns = [
		{key: "title", label: "제목"},
		{key: "period", label: "기간"}
	];

	const [selectedItems, setSelectedItems] = useState([]);
	const [isDetailVisible, setIsDetailVisible] = useState(null);
	const [animationState, setAnimationState] = useState("");

	const events = {
		onCellClick: (item, col, rowIndex, conIndex) => {
		if (isDetailVisible && isDetailVisible.index === rowIndex && animationState === "show") {
			closeDetail();
		} else {
			setIsDetailVisible({value: item, index: rowIndex});
			setAnimationState("show");
		}
		},
	};

	const closeDetail = () => {
		setAnimationState("hide");
	};

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