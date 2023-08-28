import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await getRepository(User).save({
    name,
    email,
    password: await bcryptjs.hash(password, 12),
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).send({
      message: "Invalid Credentials",
    });
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    return res.status(400).send({
      message: "Invalid Credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
    },
    "access_secret",
    { expiresIn: 60 * 60 }
  );

  const refreshToken = jwt.sign({ id: user.id }, "refresh_secret", {
    expiresIn: 24 * 60 * 60,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, //equivalent to 7 days
  });

  res.send({ message: "Login Success", accessToken });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const accessToken: any = req.headers["authorization"];

    const token = accessToken.replace("Bearer ", "");

    const payload: any = jwt.verify(token, "access_secret");

    if (!payload) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const user = await getRepository(User).findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const { ...data } = user;

    res.send(data);
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message: "Unauthenticated",
    });
  }
};

export const Refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const payload: any = jwt.verify(refreshToken, "refresh_secret");

    if (!payload) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const accessToken = jwt.sign(
      {
        id: payload.id,
      },
      "access_secret",
      { expiresIn: 60 * 60 }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
    });

    res.send({
      message: "success",
    });
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie("accessToken", "", { maxAge: 0 });
  res.cookie("refreshToken", "", { maxAge: 0 });
};
