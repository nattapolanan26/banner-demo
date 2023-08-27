"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const bannerController_1 = require("../controllers/bannerController");
const banner_1 = require("../validate/banner");
const BannerRoutes = (router) => {
    router.get("/api/banner", bannerController_1.GetBanner);
    router.post("/api/banner", bannerController_1.CreateBanner);
    router.put("/api/banner/:id", banner_1.bannerDataValidateChainMethod, bannerController_1.updateBanner);
};
exports.BannerRoutes = BannerRoutes;
