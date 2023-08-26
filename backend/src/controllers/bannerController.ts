import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Banner } from "../entity/banner.entity";

export const GetBanner = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(Banner).find();

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ err });
  }
};
