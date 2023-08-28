import { Router } from "express";
import {
  GetShop,
  CreateShop,
  UpdateShop,
  DeleteShop,
} from "../controllers/shopController";
import { shopDataValidateChainMethod } from "../validate/shop";

export const ShopRoutes = (router: Router) => {
  router.get("/api/shop", GetShop);
  router.post("/api/shop/create", shopDataValidateChainMethod, CreateShop);
  router.put("/api/shop/:id", shopDataValidateChainMethod, UpdateShop);
  router.delete("/api/shop/:id", DeleteShop);
};
