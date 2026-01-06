import axios from "@/api/axios";
import { Recruiting } from "@/types/recruiting";
import { RecruitingDetail } from "@/types/recruitingDetail";

/**
 * 모집글 생성 body (명세 기준)
 */
export type CreateRecruitingBody = {
  projectType: string;         // 수업 / 졸업작품
  projectSpecific: string;     // 과목명
  classes: string;             // 분반
  topic: string;               // 주제
  totalPeople: number;
  recruitPeople: number;
  title: string;
  context: string;
  myKeyword: string[];
};

/**
 * 모집글 생성
 * POST /recruiting/createPost/{userId}
 */
export const createRecruiting = async (
  userId: number,
  body: CreateRecruitingBody
) => {
  const res = await axios.post(
    `/recruiting/createPost/${userId}`,
    body
  );
  return res.data;
};

/**
 * 모집글 상세 조회
 * GET /recruiting/detail/{recruitingId}/{myId}
 */
export const getRecruitingDetail = async (
  recruitingId: number,
  myId: number
): Promise<RecruitingDetail> => {
  const res = await axios.get<RecruitingDetail>(
    `/recruiting/detail/${recruitingId}/${myId}`
  );
  return res.data;
};

/**
 * 모집글 필터 조회
 * GET /recruiting/filter
 */
type FilterRecruitingsParams = {
  types?: string[];
  departments?: string[];
  name?: string;
};

export const filterRecruitings = async (
  params: FilterRecruitingsParams
): Promise<Recruiting[]> => {
  const res = await axios.get<Recruiting[]>(
    "/recruiting/filter",
    {
      params: {
        type: params.types?.join(","),
        departments: params.departments?.join(","),
        name: params.name,
      },
    }
  );
  return res.data;
};

/**
 * 모집글 전체 조회
 * GET /recruiting/findAll
 */
type GetRecruitingsParams = {
  types?: string[];
  departments?: string[];
  keyword?: string;
};

export const getRecruitings = async (
  params?: GetRecruitingsParams
): Promise<Recruiting[]> => {
  const res = await axios.get<Recruiting[]>(
    "/recruiting/findAll",
    { params }
  );
  return res.data;
};

export type UpdateRecruitingBody = {
  projectType: string;
  projectSpecific: string;
  classes: string;
  topic: string;
  totalPeople: number;
  recruitPeople: number;
  title: string;
  context: string;
  keyword: string[];
};

export const updateRecruiting = async (
  recruitingId: number,
  myId: number,
  body: UpdateRecruitingBody
) => {
  const res = await axios.patch(
    `/recruiting/${recruitingId}/${myId}`,
    body
  );
  return res.data;
};

export const deleteRecruiting = async (
  recruitingId: number,
  myId: number
) => {
  const res = await axios.delete(
    `/recruiting/${recruitingId}/${myId}`
  );
  return res.data;
};
