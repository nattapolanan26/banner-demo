import { Router } from "express";
import { GetBanner } from "../controllers/bannerController";

export const BannerRoutes = (router: Router) => {
  router.get("/api/banner", GetBanner);
};
