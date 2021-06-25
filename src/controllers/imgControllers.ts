import path from "path";
import { Request, Response } from "express";
import Image, { IImage } from "../models/imgModels";

class ImageControllers {
  public async getImg(req: Request, res: Response) {
    const fImg = await Image.findOne({ filename: req.params.filename });

    console.log(__dirname + fImg?.path);
    if (fImg) {
      return res.sendFile(path.join(__dirname, "../../", fImg.path));
    }
    return res.json({ message: "imagen no encontrada " });
  }
  public async newImg(req: Request, res: Response) {
    //console.log(req.file);
    const nImg = new Image({
      path: req.file?.path,
      relativePath: "img/${req.file.filename}",
      filename: req.file?.filename,
    });
    await nImg.save();
    res.json({ message: "imagen subida" });
  }
}

export const imageControllers = new ImageControllers();
