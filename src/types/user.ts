// 회원가입 요청
export interface SignUpRequest {
  name: string;
  studentId: string;
  grade: number;
  semester: number;
  department: string;
  firstMajor: string;
  secondMajor?: string;
  phoneNumber?: string;
  gpa?: number;
  profileImage?: File;
}

// 회원가입 응답
export interface SignUpResponse {
  userId: number;
  name: string;
}

//유저 조회용
export interface UserProfile {
  userId: number;
  name: string;
  firstMajor: string;
  secondMajor?: string;
  studentId: string;
  introduction: string;
  skillList: string[];
  peerGoodKeywords: string[];
  imageUrl: string;
}
