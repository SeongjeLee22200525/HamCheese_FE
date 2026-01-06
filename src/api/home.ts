import axios from "axios";

export type ProfileFeed = {
  userId: number;
  name: string;
  firstMajor: string;
  secondMajor: string;
  studentId: string;
  introduction: string;
  skillList: string[];
  peerGoodKeywords: string[];
  imageUrl: string;
};

export type RecruitingFeed = {
  recruitingId: number;
  name: string;
  projectType: string;
  projectSpecific: string;
  classes: number;
  topic: string;
  totalPeople: number;
  recruitPeople: number;
  title: string;
  myKeyword: string[];
};

export type FirstPageResponse = {
  profileFeedList: ProfileFeed[];
  recruitingFeedList: RecruitingFeed[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getFirstPage = async () => {
  const res = await axios.get<FirstPageResponse>(
    `${API_BASE_URL}/user/firstPage`
  );
  return res.data;
};
