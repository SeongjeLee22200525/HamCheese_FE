import { UserProfile } from "@/types/user";

export const mockUsers: UserProfile[] = [
  {
    userId: 1,
    name: "서예진",
    imageUrl: "/images/profile1.jpg",
    firstMajor: "경영학부",
    secondMajor: "국제통상학과",
    studentId: "20학번",
    introduction:
      "기획과 정리를 좋아하고 팀 내 소통을 중요하게 생각합니다.",
    skillList: ["기획", "PPT", "리서치"],
    peerGoodKeywords: ["책임감", "소통", "성실함"],
  },
  {
    userId: 2,
    name: "조기훈",
    imageUrl: "/images/profile2.jpg",
    firstMajor: "전산전자공학부",
    secondMajor: null,
    studentId: "22학번",
    introduction:
      "문제를 구조적으로 분석하고 실행 가능한 해결책을 제시합니다.",
    skillList: ["React", "TypeScript", "문제해결"],
    peerGoodKeywords: ["논리적", "집중력", "꾸준함"],
  },
  {
    userId: 3,
    name: "박소은",
    imageUrl: null, // 기본 이미지 테스트
    firstMajor: "상담심리사회복지학부",
    secondMajor: null,
    studentId: "21학번",
    introduction:
      "팀 분위기를 부드럽게 만들고 의견을 조율하는 역할을 자주 맡아요.",
    skillList: ["커뮤니케이션", "문서정리"],
    peerGoodKeywords: ["배려심", "경청", "협력적"],
  },
];
