export const types = [
  "수업",
  "졸업작품",
  "동아리/학회",
  "대회",
] as const;

export const PROJECT_TYPE_CONFIG = {
  수업: {
    fields: [
      {
        name: "projectSpecific",
        placeholder: "(ex) 환경과 인간, 컴퓨터 구조",
        width: "w-72",
      },
      {
        name: "classes",
        placeholder: "2",
        width: "w-14",
        type: "number",
        suffix: "분반",
      },
    ],
  },

  졸업작품: {
    fields: [
      {
        name: "graduationTopic",
        placeholder: "(ex) 전전 캡스톤, 서비스 디그리",
        width: "w-72",
      },
      {
        name: "professor",
        placeholder: "(ex) 남재창",
        width: "w-40",
        suffix: "교수님",
      },
    ],
  },

  "동아리/학회": {
    fields: [
      {
        name: "clubName",
        placeholder: "(ex) CRA, LnA",
        width: "w-72",
      },
      {
        name: "part",
        placeholder: "(ex) 25기수",
        width: "w-40",
        suffix: "파트",
      },
    ],
  },

  대회: {
    fields: [
      {
        name: "contestName",
        placeholder: "(ex) 2025 정션아시아 해커톤",
        width: "w-72",
      },
      {
        name: "contestPart",
        placeholder: "(ex) 디자인",
        width: "w-40",
        suffix: "파트",
      },
    ],
  },
} as const;
