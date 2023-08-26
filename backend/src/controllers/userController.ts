import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
export const GetUsers = async (req: Request, res: Response) => {
  try {
    const user = await getRepository(User).find();

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const data = {
    name: "",
    email: "",
    password: "",
  };

  try {
    const user = await getRepository(User).findOne({
      where: {
        id,
      },
    });

    data.email = req.body.email;
    data.name = req.body.name;
    data.password = await bcryptjs.hash(req.body.password, 12);

    await getRepository(User).save({
      ...user, // existing fields
      ...data, // updated fields
    });

    res.status(200).json({ message: "update success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const result = await getRepository(User).delete({ id });

    if (!result.affected) {
      res.status(401).json({ message: "not found id" });
    }

    res.status(200).json({ message: "delete success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};
