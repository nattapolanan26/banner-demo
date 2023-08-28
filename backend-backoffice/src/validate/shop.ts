import { body } from "express-validator";
export const shopDataValidateChainMethod = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Shop name is required")
    .isString()
    .withMessage("Shop name should be string"),
  body("lat")
    .exists({ checkFalsy: true })
    .withMessage("Shop lat is required")
    .isString()
    .withMessage("Shop lat should be string"),
  body("lng")
    .exists({ checkFalsy: true })
    .withMessage("Shop lng is required")
    .isString()
    .withMessage("Shop lng should be string"),
];
