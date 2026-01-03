export const mockMateProfile = {
  profile: {
    name: "서예진",
    email: "yejin.seo@handong.ac.kr",
    department: "AI융합학부",
    firstMajor: "GE",
    secondMajor: "모듈",
    gpa: 4.12,
    grade: 3,
    studentId: "20학번",
    semester: 6,
    imageUrl: "/mock/profile.jpg",
  },

  introduction:
    "안녕하세요. 20학번 GE전공 서예진입니다. 기획 전반에 대한 이해를 바탕으로 아이디어를 구조화하고, 목적에 맞는 실행 전략을 설계하는 데 강점이 있습니다.",

  skills: ["기획", "PPT", "리서치", "PM"],

  activities: [
    {
      year: 2025,
      title: "PARD 6기 숏커톤 대상",
      link: "https://pard.com",
    },
    {
      year: 2024,
      title: "PARD 6기 기획",
      link: "",
    },
    {
      year: 2023,
      title: "2023 한스트 1일차 기획운영팀장",
      link: "",
    },
  ],

  peerReview: {
    goodKeywordCount: 14,
    badKeywordCount: 4,

    // ✅ 서버 해시맵 형식 (키워드 문자열 = 식별자)
    peerGoodKeyword: {
      "자료조사를 꼼꼼하게 해요": 12,
      "팀원 의견을 존중해요": 10,
      "맡은 역할을 잘 해내요": 7,
    },

    peerBadKeyword: {
      "자료조사가 부족해요": 2,
      "공유 문서를 이해하기 어려워요": 1,
      "팀 관리가 원활하지 않아요": 1,
      "프로젝트 참여도가 낮아요": 3,
    },
  },
};
