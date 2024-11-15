import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback} from "react";
import axiosInstance from "@/lib/axiosInstance";

type User = {
  username: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signin: () => void;
  signout: (callback?: () => void) => void;
  setTokenAndUser: (token: string) => void;
  isUserLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/auth/me");
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchUser()
      .then();
  }, []);

  const signin = () => {
    window.location.href = "http://localhost:4000/auth/microsoft";
  };

  const signout = async (callback?: () => void) => {
    try {
      await axiosInstance.get("/auth/logout");
      setUser(null);
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common['Authorization'];
      if (callback) callback();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const setTokenAndUser = (token: string) => {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axiosInstance.get('/auth/user')
      .then(response => {
        setUser({ username: response.data.username, token });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const isUserLoggedIn = useCallback(() => !!user, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error, signin, signout, setTokenAndUser, isUserLoggedIn: isUserLoggedIn() }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
