import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function normalizeRole(r) {
  if (!r) return r;
  const x = r.toLowerCase();
  if (x === "user") return "regular";
  return x;
}

function readSession() {
  const token = localStorage.getItem("token");
  const role = normalizeRole(localStorage.getItem("role"));
  const id = localStorage.getItem("userId");
  return token ? { token, role, id } : null;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readSession());

  useEffect(() => {
    const sync = () => setUser(readSession());
    window.addEventListener("auth:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("auth:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = (data) => {
    const role = normalizeRole(data.user.role);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", data.user._id);
    setUser({ token: data.token, role, id: data.user._id });
    window.dispatchEvent(new Event("auth:changed"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUser(null);
    window.dispatchEvent(new Event("auth:changed"));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
