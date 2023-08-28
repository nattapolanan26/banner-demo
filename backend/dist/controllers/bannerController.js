"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBanner = exports.UpdateBanner = exports.UpSearchBanner = exports.GetBanner = void 0;
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../entity/banner.entity");
const express_validator_1 = require("express-validator");
const GetBanner = async (req, res) => {
    try {
        const bannerRepo = (0, typeorm_1.getRepository)(banner_entity_1.Banner);
        const latestRepo = await bannerRepo
            .createQueryBuilder("banner")
            .select()
            .getOne();
        res.status(200).json(latestRepo);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
exports.GetBanner = GetBanner;
const UpSearchBanner = async (req, res) => {
    const file = req.files;
    console.log(req.files);
    const file_billboard = file["file_billboard"]
        ? file["file_billboard"][0].filename
        : "";
    const file_medium_banner = file["file_medium_banner"]
        ? file["file_medium_banner"][0].filename
        : "";
    const file_large_rectangle = file["file_large_rectangle"]
        ? file["file_large_rectangle"][0].filename
        : "";
    const bannerRepo = (0, typeorm_1.getRepository)(banner_entity_1.Banner);
    const latestRepo = await bannerRepo
        .createQueryBuilder("banner")
        .select()
        .getOne();
    const fileGroup = {
        file_billboard: file_billboard || (latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_billboard),
        file_medium_banner: file_medium_banner || (latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_medium_banner),
        file_large_rectangle: file_large_rectangle || (latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_large_rectangle),
    };
    await (0, typeorm_1.getRepository)(banner_entity_1.Banner)
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
exports.UpSearchBanner = UpSearchBanner;
const UpdateBanner = async (req, res) => {
    var _a;
    const fileimage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
        data.file = fileimage;
        const errors = (0, express_validator_1.validationResult)(data);
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
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.UpdateBanner = UpdateBanner;
const DeleteBanner = async (req, res) => {
    const file = req.headers.delete;
    const bannerRepo = (0, typeorm_1.getRepository)(banner_entity_1.Banner);
    const latestRepo = await bannerRepo
        .createQueryBuilder("banner")
        .select()
        .getOne();
    if (file == "billboard") {
        latestRepo.file_billboard = "";
    }
    else if (file == "medium_banner") {
        latestRepo.file_medium_banner = "";
    }
    else if (file == "large_rectangle") {
        latestRepo.file_large_rectangle = "";
    }
    const fileGroup = {
        file_billboard: latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_billboard,
        file_medium_banner: latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_medium_banner,
        file_large_rectangle: latestRepo === null || latestRepo === void 0 ? void 0 : latestRepo.file_large_rectangle,
    };
    await (0, typeorm_1.getRepository)(banner_entity_1.Banner)
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
exports.DeleteBanner = DeleteBanner;
