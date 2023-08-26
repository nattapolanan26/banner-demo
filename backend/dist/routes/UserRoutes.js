"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const userController_1 = require("../controllers/userController");
const UserRoutes = (router) => {
    router.get("/api/users", userController_1.GetUsers);
    router.put("/api/user/:id", userController_1.updateUser);
    router.delete("/api/user/:id", userController_1.deleteUser);
};
exports.UserRoutes = UserRoutes;
