export const PEER_REVIEW_VISIBLE_COUNT = 3;

/* ===== 긍정 키워드 ===== */
export const POSITIVE_PEER_KEYWORDS: Record<
  string,
  { label: string; emoji: string }
> = {
  GOOD_PLANNING: { label: "자료조사를 꼼꼼하게 해요", emoji: "🔍" },
  CLEAR_DOCUMENT: { label: "내용을 한눈에 보이게 정리해요", emoji: "📄" },
  DOC_READABILITY: { label: "문서 가독성을 잘 신경 써요", emoji: "😊" },
  GOOD_RECORD: { label: "기록을 잘 남겨요", emoji: "✍️" },

  PPT_SKILL: { label: "PPT를 잘 만들어요", emoji: "🖥️" },
  PRESENT_FLOW: { label: "발표 흐름을 잘 잡아요", emoji: "🎤" },
  PRESENT_DELIVERY: { label: "발표 전달력이 좋아요", emoji: "📣" },

  COMMUNICATION: { label: "연락이 잘 돼요", emoji: "📱" },
  MEETING_EXPLANATION: { label: "회의 때 의견을 잘 설명해요", emoji: "🗣️" },
  RESPECT_TEAM_OPINION: { label: "팀원 의견을 존중해요", emoji: "🤝" },
  ACTIVE_FEEDBACK: { label: "의견·피드백을 적극적으로 제안해요", emoji: "💬" },

  SCHEDULE_MANAGEMENT: { label: "팀 일정 관리를 잘 해요", emoji: "📅" },
  ROLE_DISTRIBUTION: { label: "역할 분담을 잘 해요", emoji: "👥" },
  TEAM_ATMOSPHERE: { label: "팀 분위기를 잘 만들어요", emoji: "😊" },

  RESPONSIBILITY: { label: "팀 프로젝트에 성실해요", emoji: "🏃‍♂️" },
  TIME_PROMISE: { label: "시간 약속을 잘 지켜요", emoji: "⏰" },
  ROLE_EXECUTION: { label: "맡은 역할을 잘 해내요", emoji: "🔥" },
  RESULT_QUALITY: { label: "결과물 퀄리티가 좋아요", emoji: "🏆" },
  MAJOR_UTILIZATION: { label: "전공 역량을 잘 활용해요", emoji: "🎓" },
};

/* ===== 부정 키워드 ===== */
export const NEGATIVE_PEER_KEYWORDS: Record<
  string,
  { label: string; emoji: string }
> = {
  LACK_RESEARCH: { label: "자료조사가 부족해요", emoji: "🔍" },
  POOR_ORGANIZATION: { label: "자료 정리가 잘 안 돼요", emoji: "📂" },
  DOC_UNDERSTANDING_DIFFICULT: {
    label: "공유 문서를 이해하기 어려워요",
    emoji: "📄",
  },
  NO_RECORD: { label: "기록을 잘 남기지 않아요", emoji: "✏️" },

  LOW_PPT_QUALITY: { label: "PPT 완성도가 낮아요", emoji: "🖥️" },
  PRESENT_FLOW_BAD: { label: "발표 흐름이 매끄럽지 않아요", emoji: "🎙️" },
  PRESENT_DELIVERY_BAD: {
    label: "발표 전달력이 아쉬워요",
    emoji: "📢",
  },

  COMMUNICATION_BAD: { label: "연락이 잘 안 돼요", emoji: "📵" },
  MEETING_CONFUSION: {
    label: "회의 때 핵심 전달이 어려워요",
    emoji: "🧠",
  },
  IGNORE_TEAM_OPINION: {
    label: "팀원 의견을 반영하지 않아요",
    emoji: "🙅‍♂️",
  },
  PASSIVE_FEEDBACK: {
    label: "의견·피드백이 소극적이에요",
    emoji: "💭",
  },

  TEAM_MANAGEMENT_WEAK: {
    label: "팀 관리가 원활하지 않아요",
    emoji: "📅",
  },
  ROLE_UNCLEAR: { label: "역할 분담이 명확하지 않아요", emoji: "👥" },
  TEAM_ATMOSPHERE_BAD: {
    label: "팀 분위기가 어색해요",
    emoji: "😐",
  },

  LOW_PARTICIPATION: {
    label: "프로젝트 참여도가 낮아요",
    emoji: "🏃‍♂️",
  },
  ABSENT_FREQUENT: { label: "자리를 자주 비워요", emoji: "🚪" },
  ROLE_INCOMPLETE: {
    label: "역할을 끝까지 수행하지 않아요",
    emoji: "⚠️",
  },
  RESULT_QUALITY_BAD: {
    label: "결과물 퀄리티가 아쉬워요",
    emoji: "📉",
  },
  MAJOR_UTILIZATION_BAD: {
    label: "전공 역량 활용이 부족해요",
    emoji: "🎓",
  },
};
