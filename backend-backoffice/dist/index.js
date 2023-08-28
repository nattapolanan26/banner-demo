"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const AuthRoutes_1 = require("./routes/AuthRoutes");
const UserRoutes_1 = require("./routes/UserRoutes");
const BannerRoutes_1 = require("./routes/BannerRoutes");
(0, typeorm_1.createConnection)().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.static("public"));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "http://localhost:8080",
            "http://localhost:4200",
            "http://localhost:5173",
        ],
        credentials: true,
    }));
    (0, AuthRoutes_1.AuthRoutes)(app);
    (0, UserRoutes_1.UserRoutes)(app);
    (0, BannerRoutes_1.BannerRoutes)(app);
    app.listen(8000, () => {
        console.log("Listening to port 8000");
    });
});
