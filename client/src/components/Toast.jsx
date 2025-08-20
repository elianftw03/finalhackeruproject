import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import "../styles/Toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((msg, type = "ok") => {
    const id = Math.random().toString(36).slice(2);
    setItems((p) => [...p, { id, msg, type }]);
    setTimeout(() => setItems((p) => p.filter((x) => x.id !== id)), 2200);
  }, []);
  const value = useMemo(() => ({ toast: push }), [push]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-wrap">
        {items.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
