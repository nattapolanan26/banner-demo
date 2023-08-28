import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Shop } from "../entity/shop.entity";
import { SettingMap as Map } from "../entity/setting.entity";
import { validationResult } from "express-validator";

export const GetShop = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(Shop).find();

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const CreateShop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    await getRepository(Shop)
      .save(req.body)
      .catch((err) => {
        console.error(err);
        next(err);
      });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateShop = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const user = await getRepository(Shop).findOne({
      where: {
        id,
      },
    });

    await getRepository(Shop).save({
      ...user, // existing fields
      ...req.body, // updated fields
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

export const DeleteShop = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const result = await getRepository(Shop).delete({ id });

    if (!result.affected) {
      res.status(404).json({ message: "not found id" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

export const CreateSettingMap = async (req: Request, res: Response) => {
  try {
    const mapRepo = getRepository(Map);

    const latestRepo = await mapRepo
      .createQueryBuilder("setting_map")
      .select()
      .getOne();

    await getRepository(Map)
      .save({
        ...latestRepo,
        ...req.body,
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ msgError: err.message });
      });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

export const GetSettingMap = async (req: Request, res: Response) => {
  try {
    const mapRep = getRepository(Map);

    const latestRepo = await mapRep
      .createQueryBuilder("setting_map")
      .select()
      .getOne();

    res.status(200).json(latestRepo);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
