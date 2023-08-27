import { createContext, useContext } from "react";
import api from "../../services/api";

const BannerContext = createContext();

const BannerProvider = ({ children }) => {
  const GetBanner = async () => {
    const result = await api.get("/api/banner");

    return result;
  };

  const CreateBanner = async (data) => {
    const register = await api
      .post("/api/banner", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => window.location.reload());

    return register;
  };

  const UpdateBanner = async (data, id) => {
    const register = await api
      .put(`/api/banner/${id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => window.location.reload());

    return register;
  };

  const DeleteBanner = async (id) => {
    const register = await api
      .delete(`/api/banner/${id}`)
      .then(() => window.location.reload());

    return register;
  };

  const value = {
    GetBanner,
    CreateBanner,
    UpdateBanner,
    DeleteBanner,
  };
  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};
export default BannerProvider;

export const useBanner = () => useContext(BannerContext);
