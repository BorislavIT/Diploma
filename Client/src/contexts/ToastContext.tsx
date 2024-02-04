import { FC, ReactNode, createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

export type ToastContextValue = {
  success: (summary: string, detail?: string) => void;
  info: (summary: string, detail?: string) => void;
  warn: (summary: string, detail?: string) => void;
  error: (summary: string, detail?: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const toastLifeTime = 3000;

  const success = (summary: string, detail: string = "") => {
    toastRef.current?.show({
      severity: "success",
      summary,
      detail,
      life: toastLifeTime,
    });
  };

  const info = (summary: string, detail: string = "") => {
    toastRef.current?.show({
      severity: "info",
      summary,
      detail,
      life: toastLifeTime,
    });
  };

  const warn = (summary: string, detail: string = "") => {
    toastRef.current?.show({
      severity: "warn",
      summary,
      detail,
      life: toastLifeTime,
    });
  };

  const error = (summary: string, detail: string = "") => {
    toastRef.current?.show({
      severity: "error",
      summary,
      detail,
      life: toastLifeTime,
    });
  };

  return (
    <ToastContext.Provider value={{ success, info, warn, error }}>
      <Toast ref={toastRef} className="fully-visible-toast" />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext)!;
