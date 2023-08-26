import { Router } from "express";
import {
  GetUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";

export const UserRoutes = (router: Router) => {
  router.get("/api/users", GetUsers);
  router.put("/api/user/:id", updateUser);
  router.delete("/api/user/:id", deleteUser);
};
