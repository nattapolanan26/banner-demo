import { Router } from "express";
import {
  GetBanner,
  UpSearchBanner,
  DeleteBanner,
} from "../controllers/bannerController";
// import { bannerDataValidateChainMethod } from "../validate/banner";
import { storage } from "../helper/fileStorage";
import multer from "multer";

const upload = multer({ storage: storage });

export const BannerRoutes = (router: Router) => {
  router.get("/api/banner", GetBanner);
  router.post(
    "/api/banner",
    upload.fields([
      { name: "file_billboard" },
      { name: "file_medium_banner" },
      { name: "file_large_rectangle" },
    ]),
    UpSearchBanner
  );
  //   router.put(
  //     "/api/banner/:id",
  //     upload.single("file"),
  //     bannerDataValidateChainMethod,
  //     UpdateBanner
  //   );
  router.post("/api/banner/del", DeleteBanner);
};
