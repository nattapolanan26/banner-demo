import { createContext, useContext } from "react";
import api from "src/services/api";

const UserContext = createContext();

const ShopProvider = ({ children }) => {
  const getShop = async () => {
    const result = await api.get("/api/shop");

    return result;
  };

  const createShop = async (data) => {
    await api
      .post("/api/shop/create", data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const updateShop = async (data, id) => {
    const register = await api
      .put(`/api/shop/${id}`, data)
      .then(() => window.location.reload());

    return register;
  };

  const deleteShop = async (id) => {
    const register = await api
      .delete(`/api/shop/${id}`)
      .then(() => window.location.reload());

    return register;
  };

  const value = {
    createShop,
    getShop,
    updateShop,
    deleteShop,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default ShopProvider;

export const useShop = () => useContext(UserContext);
