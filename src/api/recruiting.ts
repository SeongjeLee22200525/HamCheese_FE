import axios from "@/api/axios";
import { Recruiting } from "@/types/recruiting";
import { RecruitingDetail } from "@/types/recruitingDetail";

type CreateRecruitingBody = {
  projectType: string;
  projectSpecific: string;
  classes: number;
  topic: string;
  totalPeople: number;
  recruitPeople: number;
  title: string;
  context: string;
  keyword: string[];
};

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

export const getRecruitingDetail = async (
  recruitingId: number,
  myId: number
): Promise<RecruitingDetail> => {
  const res = await axios.get<RecruitingDetail>(
    `/recruiting/detail/${recruitingId}/${myId}`
  );

  return res.data;
};


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
