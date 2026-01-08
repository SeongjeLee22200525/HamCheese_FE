"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useAlarm } from "@/hooks/chat/useAlarm";

export default function AlarmHandler() {
  const myId = useUserStore((s) => s.user?.myId);
  const { alarms, removeAlarm } = useAlarm(myId);

  return (
    <div>
      {alarms
        .filter((a) => !a.ok) // ❌ 거절 알림만
        .map((alarm) => (
          <div
            key={alarm.alarmId}
            className="bg-[#E1EDF0] justify-between items-center px-4 py-3 rounded mb-2"
          >
            <div>
              <span className="font-bold">{alarm.senderName}</span>
              님이 대화가 성사되지 못했어요
            </div>

            {/* 🔥 확인 버튼 오른쪽 정렬 (기존 스타일 유지) */}
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
  );
}
