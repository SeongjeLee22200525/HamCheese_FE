import { useEffect, useState } from "react";
import axios from "@/api/axios";

export type Alarm = {
  alarmId: number;
  senderName: string;
  ok: boolean;
};

export function useAlarm(userId?: number) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  /* ================= 알림 전체 조회 ================= */
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`/alarm/${userId}`)
      .then((res) => setAlarms(res.data))
      .catch(console.error);
  }, [userId]);

  /* ================= 알림 삭제 ================= */
  const removeAlarm = async (alarmId: number) => {
    await axios.delete(`/alarm/${alarmId}`);
    setAlarms((prev) => prev.filter((a) => a.alarmId !== alarmId));
  };

  return { alarms, removeAlarm };
}
