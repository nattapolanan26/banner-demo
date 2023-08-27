"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.GetUsers = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const GetUsers = async (req, res) => {
    try {
        const user = await (0, typeorm_1.getRepository)(user_entity_1.User).find();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ err });
    }
};
exports.GetUsers = GetUsers;
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = {
        name: "",
        email: "",
        password: "",
    };
    try {
        const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({
            where: {
                id,
            },
        });
        data.email = req.body.email;
        data.name = req.body.name;
        data.password = await bcryptjs_1.default.hash(req.body.password, 12);
        await (0, typeorm_1.getRepository)(user_entity_1.User).save({
            ...user,
            ...data, // updated fields
        });
        res.status(200).json({ message: "update success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await (0, typeorm_1.getRepository)(user_entity_1.User).delete({ id });
        if (!result.affected) {
            res.status(404).json({ message: "not found id" });
        }
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
exports.deleteUser = deleteUser;
