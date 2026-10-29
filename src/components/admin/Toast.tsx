"use client";

import { CircleCheck } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

/** Confirmation éphémère après une action (enregistrement, suppression…), annoncée aux lecteurs d'écran. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 3500);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed right-5 bottom-5 z-[60] flex justify-end">
        {message && (
          <p className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white shadow-search">
            <CircleCheck size={18} strokeWidth={2} aria-hidden="true" className="text-focus" />
            {message}
          </p>
        )}
      </div>
    </ToastContext.Provider>
  );
}
