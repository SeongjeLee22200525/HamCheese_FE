"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useAlarm } from "@/hooks/chat/useAlarm";
import Snackbar from "@/components/common/Snackbar";

type SnackbarAlarm = {
  alarmId: number;
  message: string;
};

export default function AlarmHandler() {
  const myId = useUserStore((s) => s.user?.myId);
  const { alarms, removeAlarm } = useAlarm(myId);

  const [snackbar, setSnackbar] = useState<SnackbarAlarm | null>(null);

  /* ================= 수락 알림 → 스낵바 ================= */
  useEffect(() => {
    const accepted = alarms.find((a) => a.ok);

    if (!accepted) return;

    setSnackbar({
      alarmId: accepted.alarmId,
      message: `${accepted.senderName}님이 대화를 수락했어요`,
    });
  }, [alarms]);

  return (
    <>
      {/* ================= 스낵바 ================= */}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          onClose={async () => {
            await removeAlarm(snackbar.alarmId);
            setSnackbar(null);
          }}
        />
      )}

      {/* ================= 거절 알림 UI ================= */}
      <div>
        {alarms
          .filter((a) => !a.ok)
          .map((alarm) => (
            <div
              key={alarm.alarmId}
              className="bg-[#E1EDF0] justify-between items-center"
            >
              <div>
                <span className="font-bold">{alarm.senderName}</span>
                님이 대화가 성사되지 못했어요
              </div>

              {/* 🔥 여기만 살짝 수정 */}
              <div className="flex mt-3">
                <button
                  className="ml-auto text-sm text-[#00C3CC]"
                  onClick={() => removeAlarm(alarm.alarmId)}
                >
                  확인
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
