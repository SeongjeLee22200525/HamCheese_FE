export interface RecruitingDetail {
  name: string;                // 작성자 이름
  projectType: string;         // 수업 / 졸업작품
  projectSpecific: string;     // 과목명
  classes: number;             // 분반
  topic: string;               // 주제
  totalPeople: number;
  recruitPeople: number;
  title: string;
  myKeyword: string[];
  date: string;                // 작성일
  context: string;
  canEdit: boolean;

  postingList: {
    recruitingId: number;
    name: string;
    projectType: string;
    projectSpecific: string;
    classes: number;
    topic: string;
    totalPeople: number;
    recruitPeople: number;
    title: string;
    skillList: string[];
  }[];
}
