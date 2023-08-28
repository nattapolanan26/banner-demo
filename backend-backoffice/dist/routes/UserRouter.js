"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const authController_1 = require("../controllers/authController");
const routes = (router) => {
    router.post("/api/register", authController_1.Register);
    router.post("/api/login", authController_1.Login);
    router.get("/api/user", authController_1.AuthenticatedUser);
    router.post("/api/refresh", authController_1.Refresh);
    router.get("/api/refresh", authController_1.Logout);
};
exports.routes = routes;
