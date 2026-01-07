export interface RecruitingDetail {
  // 작성자 정보
  name: string;                 // 작성자 이름
  studentId: string;            // 작성자 학번
  firstMajor: string;           // 주전공
  secondMajor: string | null;   // 복수/부전공 (없을 수 있음)
  imageUrl: string | null;      // 프로필 이미지

  // 모집글 정보
  projectType: string;          // 수업 / 졸업작품
  projectSpecific: string;      // 과목명
  classes: string;              // 분반
  topic: string;                // 주제
  totalPeople: number;
  recruitPeople: number;
  title: string;
  myKeyword: string[];
  date: string;                 // 작성일
  context: string;

  // 권한
  canEdit: boolean;

  // 하단 다른 모집글 리스트
  postingList: {
    recruitingId: number;
    name: string;
    projectType: string;
    totalPeople: number;
    recruitPeople: number;
    title: string;
    date: string;
  }[];
}
