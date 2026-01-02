export interface Recruiting {
  recruitingId: number;
  name: string;
  projectType: string;        // 수업 | 졸작 | 동아리 | 학회 | 대회
  projectSpecific: string;    // 수업명 등
  classes: number;            // 분반
  topic: string;              // 주제
  totalPeople: number;
  recruitPeople: number;
  title: string;
  skillList: string[];
  date?: string;              // 필터 API에서만 사용
}
