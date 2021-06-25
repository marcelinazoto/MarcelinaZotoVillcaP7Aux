import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";
import Post, { IPost } from "../models/postModels";
import sha1 from "sha1";
import jsonwebtoken from "jsonwebtoken";

class UserControlllers {
  public index(req: Request, res: Response) {
    res.send("This is my api");
  }
  public async readUsers(req: Request, res: Response) {
    const rUsers = await User.find({});
    res.json({ message: "all users", rUsers });
  }
  public async addUser(req: Request, res: Response) {
    const { fullname, username, email, password } = req.body;
    const aUser = new User(req.body);
    aUser["createdAt"] = new Date();
    aUser["password"] = sha1(aUser["password"]);
    await aUser.save();
    res.status(201).json({ message: "user registered", aUser });
  }
  public async logln(req: Request, res: Response) {
    const { email, password } = req.body;
    var encryption: string = sha1(password);
    const result = await User.findOne({ email });
    if (result) {
      if (result.password == encryption) {
        var token: string = jsonwebtoken.sign(
          { id: result.id, email: result.email },
          "security"
        );
        res
          .status(200)
          .json({ serverResponse: "logged In successfully", token });
      }
    }
    res.status(300).json({ serverResponse: "Wrong credentials", encryption });
    console.log(encryption);
  }
  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { fullname, username, email, password } = req.body;
    const uUser = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "updated user", uUser });
  }
  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const dUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted" });
  }
  public async postTouser(req: Request, res: Response) {
    const { idU } = req.params;
    const { idP } = req.body;
    let userT = await User.findById(idU);
    let posT = await Post.findById(idP);
    if (userT != null && posT != null) {
      userT.posts.push(posT);
      userT.save();
    }
    res.status(300).json({ message: "post assigned to user" });
  }
  public async getProfile(req: Request, res: Response) {
    const { id } = req.params;
    const getProfileU = await User.findById(id);
    res.status(200).json({ message: "profile", serverResponse: getProfileU });
  }
}
export const userControlllers = new UserControlllers();
