import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Banner } from "../entity/banner.entity";
import { validationResult } from "express-validator";
export const GetBanner = async (req: Request, res: Response) => {
  let result: any = [];
  try {
    await getRepository(Banner)
      .find()
      .then((res) => (result = res));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  res.status(200).json(result);
};

export const CreateBanner = async (req: Request, res: Response) => {
  const fileimage: string | undefined = req.file?.filename;

  const { title, description } = req.body;

  await getRepository(Banner)
    .save({
      title,
      description,
      file: fileimage,
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msgError: err.message });
    });

  res.status(200).send({ success: true });
};

export const UpdateBanner = async (req: Request, res: Response) => {
  const fileimage: string | undefined = req.file?.filename;
  const id: number = parseInt(req.params.id);
  const data = req.body;
  try {
    data.file = fileimage;

    const errors = validationResult(data);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const field = await getRepository(Banner).findOne({
      where: {
        id,
      },
    });

    await getRepository(Banner).save({
      ...field, // existing fields
      ...data, // updated fields
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const DeleteBanner = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const result = await getRepository(Banner).delete({ id });

    if (!result.affected) {
      res.status(404).json({ message: "not found item", success: false });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
