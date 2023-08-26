import { Router } from "express";
import {
  AuthenticatedUser,
  Login,
  Logout,
  Refresh,
  Register,
} from "../controllers/authController";

export const AuthRoutes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthenticatedUser);
  router.post("/api/refresh", Refresh);
  router.get("/api/refresh", Logout);
};
