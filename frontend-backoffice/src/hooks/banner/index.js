import { createContext, useContext } from "react";
import api from "src/services/api";

const BannerContext = createContext();

const BannerProvider = ({ children }) => {
  const getBanner = async () => {
    const result = await api.get("/api/banner");

    return result;
  };

  const createBanner = async (data) => {
    const register = await api
      .post("/api/banner", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => window.location.reload());

    return register;
  };

  const updateBanner = async (data, id) => {
    const register = await api
      .put(`/api/banner/${id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => window.location.reload());

    return register;
  };

  const deleteBanner = async (file) => {
    console.log(file);
    const register = await api
      .get("/api/banner/del", {
        headers: {
          "file-delete-col": file,
        },
      })
      .then(() => window.location.reload());

    return register;
  };

  const value = {
    getBanner,
    createBanner,
    updateBanner,
    deleteBanner,
  };
  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};
export default BannerProvider;

export const useBanner = () => useContext(BannerContext);
