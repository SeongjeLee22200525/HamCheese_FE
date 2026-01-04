import axios from "@/api/axios";
import { Recruiting } from "@/types/recruiting";

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
