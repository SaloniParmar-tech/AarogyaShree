import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /* 🔄 Load user from localStorage on app start */
  useEffect(() => {
    const storedUser = localStorage.getItem("sakhi_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ✅ Login */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("sakhi_user", JSON.stringify(userData));
  };

  /* 🚪 Logout */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("sakhi_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
