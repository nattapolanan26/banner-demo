import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { AuthRoutes } from "./routes/AuthRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { BannerRoutes } from "./routes/BannerRoutes";

createConnection().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:4200",
        "http://localhost:5173",
      ],
      credentials: true,
    })
  );

  AuthRoutes(app);
  UserRoutes(app);
  BannerRoutes(app);

  app.listen(8000, () => {
    console.log("Listening to port 8000");
  });
});
