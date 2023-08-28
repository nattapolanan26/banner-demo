import { useContext, createContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "src/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token", "users"]);

  const login = async ({ email, password }) => {
    await api
      .post("/api/login", {
        email,
        password,
      })
      .then(async (res) => {
        setCookies("token", res.data.accessToken); // your token

        await api
          .get("/api/user", {
            headers: {
              authorization: `Bearer ${res.data.accessToken}`,
            },
          })
          .then((resUser) => setCookies("users", resUser.data));
      });

    navigate("/dashboard");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
