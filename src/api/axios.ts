// src/api/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 세션/쿠키 기반 대비 (지금은 없어도 OK)
  headers: {
    Accept: "application/json",
  },
});

export default instance;
