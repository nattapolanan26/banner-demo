"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadFile = (req, filePath) => {
    return new Promise((resolve, reject) => {
        const stream = fs_1.default.createWriteStream(filePath);
        stream.on("open", () => {
            console.log("Stream open ...  0.00%");
            req.pipe(stream);
        });
        stream.on("drain", () => {
            const written = parseInt(stream.bytesWritten);
            const total = parseInt(req.headers["content-length"]);
            const pWritten = ((written / total) * 100).toFixed(2);
            console.log(`Processing  ...  ${pWritten}% done`);
        });
        stream.on("close", () => {
            console.log("Processing  ...  100%");
            resolve(filePath);
        });
        stream.on("error", (err) => {
            console.error(err);
            reject(err);
        });
    });
};
exports.uploadFile = uploadFile;
