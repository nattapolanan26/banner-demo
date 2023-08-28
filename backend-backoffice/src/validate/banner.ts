import { body } from "express-validator";
export const bannerDataValidateChainMethod = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Banner title is required")
    .isString()
    .withMessage("Banner title should be string"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Banner description is required")
    .isString()
    .withMessage("Banner description should be string"),
  body("image")
    .exists({ checkFalsy: true })
    .withMessage("Banner image is required")
    .isString()
    .withMessage("Banner image should be string"),
];
