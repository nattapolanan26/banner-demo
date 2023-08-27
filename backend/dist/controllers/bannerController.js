"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBanner = exports.CreateBanner = exports.GetBanner = void 0;
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../entity/banner.entity");
const express_validator_1 = require("express-validator");
const GetBanner = async (req, res) => {
    let result = [];
    try {
        await (0, typeorm_1.getRepository)(banner_entity_1.Banner)
            .find()
            .then((res) => (result = res));
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
    res.status(200).json(result);
};
exports.GetBanner = GetBanner;
const CreateBanner = async (req, res) => {
    const { title, description, image } = req.body;
    await (0, typeorm_1.getRepository)(banner_entity_1.Banner)
        .save({
        title,
        description,
        image,
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send({ msgError: err.message });
    });
    res.status(200).send({ success: true });
};
exports.CreateBanner = CreateBanner;
const updateBanner = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const field = await (0, typeorm_1.getRepository)(banner_entity_1.Banner).findOne({
            where: {
                id,
            },
        });
        await (0, typeorm_1.getRepository)(banner_entity_1.Banner).save({
            ...field,
            ...data, // updated fields
        });
        res.status(200).json({ message: "update success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.updateBanner = updateBanner;
