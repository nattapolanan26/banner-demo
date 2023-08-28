import { Router } from "express";
import {
  GetShop,
  CreateShop,
  UpdateShop,
  DeleteShop,
  GetSettingMap,
  CreateSettingMap,
} from "../controllers/shopController";
import { shopDataValidateChainMethod } from "../validate/shop";

export const ShopRoutes = (router: Router) => {
  router.get("/api/shop", GetShop);
  router.post("/api/shop/create", shopDataValidateChainMethod, CreateShop);
  router.put("/api/shop/:id", shopDataValidateChainMethod, UpdateShop);
  router.delete("/api/shop/:id", DeleteShop);

  router.get("/api/set_map", GetSettingMap);
  router.post("/api/set_map", CreateSettingMap);
};
