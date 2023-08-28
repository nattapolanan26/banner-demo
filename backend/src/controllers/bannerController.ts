import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Banner } from "../entity/banner.entity";
import { validationResult } from "express-validator";
export const GetBanner = async (req: Request, res: Response) => {
  try {
    const bannerRepo = getRepository(Banner);

    const latestRepo = await bannerRepo
      .createQueryBuilder("banner")
      .select()
      .getOne();

    res.status(200).json(latestRepo);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const UpSearchBanner = async (req: Request, res: Response) => {
  const file = req.files as any;

  const file_billboard = file["file_billboard"]
    ? file["file_billboard"][0].filename
    : "";
  const file_medium_banner = file["file_medium_banner"]
    ? file["file_medium_banner"][0].filename
    : "";
  const file_large_rectangle = file["file_large_rectangle"]
    ? file["file_large_rectangle"][0].filename
    : "";

  const bannerRepo = getRepository(Banner);

  const latestRepo = await bannerRepo
    .createQueryBuilder("banner")
    .select()
    .getOne();

  const fileGroup = {
    file_billboard: file_billboard || latestRepo?.file_billboard,
    file_medium_banner: file_medium_banner || latestRepo?.file_medium_banner,
    file_large_rectangle:
      file_large_rectangle || latestRepo?.file_large_rectangle,
  };

  await getRepository(Banner)
    .save({
      ...latestRepo,
      ...fileGroup,
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

    const errors = validationResult(req);
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
  const file = req.headers["file-delete-col"];

  const bannerRepo = getRepository(Banner);

  const latestRepo = await bannerRepo
    .createQueryBuilder("banner")
    .select()
    .getOne();

  if (file == "billboard") {
    latestRepo!.file_billboard = "";
  } else if (file == "medium_banner") {
    latestRepo!.file_medium_banner = "";
  } else if (file == "large_rectangle") {
    latestRepo!.file_large_rectangle = "";
  }

  const fileGroup = {
    file_billboard: latestRepo?.file_billboard,
    file_medium_banner: latestRepo?.file_medium_banner,
    file_large_rectangle: latestRepo?.file_large_rectangle,
  };

  await getRepository(Banner)
    .save({
      ...latestRepo,
      ...fileGroup,
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msgError: err.message });
    });

  res.status(200).send({ success: true });
};
