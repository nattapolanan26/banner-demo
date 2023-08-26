"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Refresh = exports.AuthenticatedUser = exports.Login = exports.Register = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User).save({
        name,
        email,
        password: await bcryptjs_1.default.hash(password, 12),
    });
    res.send(user);
};
exports.Register = Register;
const Login = async (req, res) => {
    console.log("form login : ", req.body);
    const { email, password } = req.body;
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(400).send({
            message: "Invalid Credentials",
        });
    }
    if (!(await bcryptjs_1.default.compare(password, user.password))) {
        return res.status(400).send({
            message: "Invalid Credentials",
        });
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: user.id,
    }, "access_secret", { expiresIn: 60 * 60 });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, "refresh_secret", {
        expiresIn: 24 * 60 * 60,
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, //equivalent to 7 days
    });
    res.send({ message: "Login Success", accessToken });
};
exports.Login = Login;
const AuthenticatedUser = async (req, res) => {
    try {
        const accessToken = req.headers["authorization"];
        const token = accessToken.replace("Bearer ", "");
        const payload = jsonwebtoken_1.default.verify(token, "access_secret");
        if (!payload) {
            return res.status(401).send({
                message: "Unauthenticated",
            });
        }
        const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            return res.status(401).send({
                message: "Unauthenticated",
            });
        }
        const { ...data } = user;
        res.send(data);
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({
            message: "Unauthenticated",
        });
    }
};
exports.AuthenticatedUser = AuthenticatedUser;
const Refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies["refreshToken"];
        const payload = jsonwebtoken_1.default.verify(refreshToken, "refresh_secret");
        if (!payload) {
            return res.status(401).send({
                message: "unauthenticated",
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: payload.id,
        }, "access_secret", { expiresIn: 60 * 60 });
        console.log("accessToken : ", accessToken);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //equivalent to 1 day
        });
        res.send({
            message: "success",
        });
    }
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated",
        });
    }
};
exports.Refresh = Refresh;
const Logout = async (req, res) => {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.cookie("refreshToken", "", { maxAge: 0 });
};
exports.Logout = Logout;
