import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { AuthRoutes } from "./routes/AuthRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { BannerRoutes } from "./routes/BannerRoutes";
import { ShopRoutes } from "./routes/ShopRoutes";

createConnection().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  AuthRoutes(app);
  UserRoutes(app);
  BannerRoutes(app);
  ShopRoutes(app);

  app.listen(8000, () => {
    console.log("Listening to port 8000");
  });
});
