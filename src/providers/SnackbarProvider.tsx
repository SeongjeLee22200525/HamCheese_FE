"use client";

import { createContext, useContext, useState } from "react";
import Snackbar from "@/components/common/Snackbar";
import { createPortal } from "react-dom";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showSnackbar = (msg: string) => {
    console.log("📣 showSnackbar called with:", msg);
    setMessage(msg);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {message &&
        createPortal(
          <Snackbar message={message} onClose={() => setMessage(null)} />,
          document.getElementById("snackbar-root")!
        )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return ctx;
}
