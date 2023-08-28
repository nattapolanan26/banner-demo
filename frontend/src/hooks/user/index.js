import { createContext, useContext } from "react";
import api from "src/services/api";
import { useAuth } from "src/hooks/auth";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { cookies, setCookies } = useAuth();

  const getUsers = async () => {
    const users = await api.get("/api/users");

    return users;
  };

  const createUser = async (data) => {
    const register = await api
      .post("/api/register", data)
      .then(() => window.location.reload());

    return register;
  };

  const updateUser = async (data, id) => {
    const register = await api
      .put(`/api/user/${id}`, data)
      .then((res) => {
        console.log(cookies.users.id);
        console.log(id);
        if (cookies.users.id === id) {
          setCookies("users", res.data.user);
        }
      })
      .then(() => window.location.reload());

    return register;
  };

  const deleteUser = async (id) => {
    const register = await api
      .delete(`/api/user/${id}`)
      .then(() => window.location.reload());

    return register;
  };

  const value = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
