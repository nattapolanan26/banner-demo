import { createContext, useContext } from "react";
import api from "../../services/api";

const BannerContext = createContext();

const BannerProvider = ({ children }) => {
  const getBanner = async () => {
    const result = await api.get("/api/banner");

    return result;
  };

  const value = {
    getBanner,
  };
  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};
export default BannerProvider;

export const useBanner = () => useContext(BannerContext);
