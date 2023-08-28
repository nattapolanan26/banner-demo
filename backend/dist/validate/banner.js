"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerDataValidateChainMethod = void 0;
const express_validator_1 = require("express-validator");
exports.bannerDataValidateChainMethod = [
    (0, express_validator_1.body)("title")
        .exists({ checkFalsy: true })
        .withMessage("Banner title is required")
        .isString()
        .withMessage("Banner title should be string"),
    (0, express_validator_1.body)("description")
        .exists({ checkFalsy: true })
        .withMessage("Banner description is required")
        .isString()
        .withMessage("Banner description should be string"),
    (0, express_validator_1.body)("file")
        .exists({ checkFalsy: true })
        .withMessage("Banner file image is required")
        .isString()
        .withMessage("Banner file image should be string"),
];
