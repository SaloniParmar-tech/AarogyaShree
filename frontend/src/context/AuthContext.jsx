import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_BASE_URL = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Session expired");
        }

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("sakhi_user", JSON.stringify(data.user));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("sakhi_user");
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadCurrentUser();
  }, [token]);

  const saveSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("token", nextToken);
    localStorage.setItem("sakhi_user", JSON.stringify(nextUser));

    if (nextUser?.email && nextUser?.languagePreference) {
      localStorage.setItem(
        `sakhi_language_${nextUser.email}`,
        nextUser.languagePreference
      );
    }
  };

  const register = async ({ name, email, password, languagePreference }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, languagePreference }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    saveSession(data.token, data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    saveSession(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sakhi_user");
    localStorage.removeItem("token");
  };

  const updateUserLanguage = async (languagePreference) => {
    if (!user) return;

    const updatedUser = { ...user, languagePreference };
    setUser(updatedUser);
    localStorage.setItem("sakhi_user", JSON.stringify(updatedUser));
    localStorage.setItem(`sakhi_language_${user.email}`, languagePreference);

    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/auth/preference`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ languagePreference }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("sakhi_user", JSON.stringify(data.user));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        register,
        login,
        logout,
        updateUserLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
