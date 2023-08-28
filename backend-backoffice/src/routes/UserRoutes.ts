import { Router } from "express";
import {
  GetUsers,
  UpdateUser,
  DeleteUser,
} from "../controllers/userController";

export const UserRoutes = (router: Router) => {
  router.get("/api/users", GetUsers);
  router.put("/api/user/:id", UpdateUser);
  router.delete("/api/user/:id", DeleteUser);
};
