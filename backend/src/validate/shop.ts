import { body } from "express-validator";
export const shopDataValidateChainMethod = [
  body("shop_name")
    .exists({ checkFalsy: true })
    .withMessage("Shop name is required")
    .isString()
    .withMessage("Shop name should be string"),
  body("latitude")
    .exists({ checkFalsy: true })
    .withMessage("Shop latitude is required")
    .isString()
    .withMessage("Shop latitude should be string"),
  body("longitude")
    .exists({ checkFalsy: true })
    .withMessage("Shop longitude is required")
    .isString()
    .withMessage("Shop longitude should be string"),
];
