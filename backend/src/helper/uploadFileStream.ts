import fs from "fs";
import { Request } from "express";

export const uploadFile = (req: Request, filePath: string) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);

    stream.on("open", () => {
      console.log("Stream open ...  0.00%");
      req.pipe(stream);
    });

    stream.on("drain", () => {
      const written = parseInt(stream.bytesWritten as any);
      const total = parseInt(req.headers["content-length"] as string);
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
