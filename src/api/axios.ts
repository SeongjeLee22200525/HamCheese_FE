// src/api/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // 지금은 로그인 / 세션 / 쿠키 없음
  // withCredentials ❌
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
