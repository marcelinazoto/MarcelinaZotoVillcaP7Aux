import { Request, Response } from "express";
import Post, { IPost } from "../models/postModels";

class PostControlllers {
  public index(req: Request, res: Response) {
    res.send("This is post");
  }
  public async readPosts(req: Request, res: Response) {
    const rPosts = await Post.find({});
    res.json({ message: "all posts", serverResponse: rPosts });
  }
  public async addPost(req: Request, res: Response) {
    const { title, url, content, image } = req.body;
    const aPost = new Post(req.body);
    await aPost.save();
    res.status(201).json({ message: "post registered", serverResponse: aPost });
  }
  public async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, url, content, image, createdAt, updatedAt } = req.body;
    const uPost = await Post.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "updated post", serverResponse: uPost });
  }
  public async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const dPost = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "post deleted" });
  }
}
export const postControlllers = new PostControlllers();
