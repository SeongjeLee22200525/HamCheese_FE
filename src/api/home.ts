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

export const getFirstPage = async () => {
  const res = await axios.get<FirstPageResponse>(
    "http://서버주소/user/firstPage"
  );
  return res.data;
};
