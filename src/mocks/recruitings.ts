import { Recruiting } from "@/types/recruiting";

export const mockRecruitings: Recruiting[] = [
  {
    recruitingId: 1,
    name: "서예진",
    projectType: "수업",
    projectSpecific: "웹프로그래밍",
    classes: 1,
    topic: "팀 프로젝트",
    totalPeople: 4,
    recruitPeople: 2,
    title: "같이 웹프 팀플 하실 분 구해요!",
    skillList: ["React", "TypeScript", "Figma"],
    date: "2025.12.30",
  },
  {
    recruitingId: 2,
    name: "김민수",
    projectType: "졸작",
    projectSpecific: "캡스톤디자인",
    classes: 2,
    topic: "AI 서비스",
    totalPeople: 5,
    recruitPeople: 1,
    title: "AI 졸업작품 팀원 모집",
    skillList: ["Python", "AI", "FastAPI"],
    date: "2025.12.29",
  },
];
