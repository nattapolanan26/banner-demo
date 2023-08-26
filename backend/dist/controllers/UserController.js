"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.GetUsers = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
const GetUsers = async (req, res) => {
    try {
        const user = await (0, typeorm_1.getRepository)(user_entity_1.User).find();
        res.status(200).json(user);
    }
    catch (err) {
        res.json({ err });
    }
};
exports.GetUsers = GetUsers;
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("id > ", id);
    let user;
    try {
        user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({
            where: {
                id: id,
            },
        });
        user.save({
            ...user,
            ...req.body, // updated fields
        });
        res.status(200).json({ message: "update success" });
    }
    catch (err) {
        res.json({ err });
    }
};
exports.updateUser = updateUser;
