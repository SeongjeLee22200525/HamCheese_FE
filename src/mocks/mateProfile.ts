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

    positive: [
      { key: "GOOD_PLANNING", count: 12 },
      { key: "RESPECT_TEAM_OPINION", count: 10 },
      { key: "ROLE_EXECUTION", count: 7 },
      { key: "ROLE_EXECUTION", count: 7 },
    ],

    negative: [
      { key: "LACK_RESEARCH", count: 2 },
      { key: "DOC_UNDERSTANDING_DIFFICULT", count: 1 },
      { key: "TEAM_MANAGEMENT_WEAK", count: 1 },
      {key: "LOW_PARTICIPATION", count: 3},
  
    ],
  },
};
