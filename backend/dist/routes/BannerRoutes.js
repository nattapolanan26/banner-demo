"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const bannerController_1 = require("../controllers/bannerController");
// import { bannerDataValidateChainMethod } from "../validate/banner";
const fileStorage_1 = require("../helper/fileStorage");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: fileStorage_1.storage });
const BannerRoutes = (router) => {
    router.get("/api/banner", bannerController_1.GetBanner);
    router.post("/api/banner", upload.fields([
        { name: "file_billboard" },
        { name: "file_medium_banner" },
        { name: "file_large_rectangle" },
    ]), bannerController_1.UpSearchBanner);
    //   router.put(
    //     "/api/banner/:id",
    //     upload.single("file"),
    //     bannerDataValidateChainMethod,
    //     UpdateBanner
    //   );
    router.post("/api/banner/del", bannerController_1.DeleteBanner);
};
exports.BannerRoutes = BannerRoutes;
