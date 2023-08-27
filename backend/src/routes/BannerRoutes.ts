import { Router } from "express";
import {
  GetBanner,
  CreateBanner,
  UpdateBanner,
  DeleteBanner,
} from "../controllers/bannerController";
import { bannerDataValidateChainMethod } from "../validate/banner";
import { storage } from "../helper/fileStorage";
import multer from "multer";

const upload = multer({ storage: storage });

export const BannerRoutes = (router: Router) => {
  router.get("/api/banner", GetBanner);
  router.post("/api/banner", upload.single("file"), CreateBanner);
  router.put(
    "/api/banner/:id",
    upload.single("file"),
    bannerDataValidateChainMethod,
    UpdateBanner
  );
  router.delete("/api/banner/:id", DeleteBanner);
};
