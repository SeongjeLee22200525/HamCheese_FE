/* =========================
 * 공통 유저 베이스
 * ========================= */

export interface UserBase {
  name: string;
  studentId: string; // "20학번"
  department: string;
  firstMajor: string;
  secondMajor?: string;
  grade: string;
  semester: number;
  gpa?: number;
  imageUrl?: string;
}

/* =========================
 * 회원가입
 * ========================= */

// 회원가입 요청
export interface SignUpRequest {
  name: string;
  studentId: string;
  grade: string; // ✅ string
  semester: string; // ✅ string
  department: string;
  firstMajor: string;
  secondMajor?: string;
  phoneNumber: string;
  gpa?: string; // ✅ string
  email: string;
  socialId: string;
}

// 회원가입 응답
export interface SignUpResponse {
  userId: number;
  name: string;
}

/* =========================
 * 유저 조회 (리스트 / 카드)
 * ========================= */

export interface UserProfile {
  userId: number;
  name: string;
  studentId: string;
  firstMajor: string;
  secondMajor?: string;
  introduction: string;
  skillList: string[];
  peerGoodKeywords: Record<string, number>; // 🔥 여기
  imageUrl?: string;
}

/* =========================
 * 메이트 프로필 (상세 페이지) + 마이페이지 좌측 프로필바에도 사용
 * ========================= */

export interface MateProfileInfo extends UserBase {
  email: string;
}

/* =========================
 * 메이트 프로필 페이지 전체 응답
 * (mock / 서버 동일하게 사용)
 * ========================= */

export interface MateProfileResponse {
  profile: MateProfileInfo;

  introduction: string;
  skills: string[];

  activities: {
    year: number;
    title: string;
    link?: string;
  }[];

  peerReview: {
    goodKeywordCount: number;
    badKeywordCount: number;
    positive: {
      key: string;
      count: number;
    }[];
    negative: {
      key: string;
      count: number;
    }[];
  };
}

/* =========================
 * 동료평가 모달용 메타 태그
 * ========================= */

export type MetaTag =
  | {
      type: "studentId";
      value: string;
    }
  | {
      type: "major";
      value: string;
    };