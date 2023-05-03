import type { NextApiRequest, NextApiResponse } from "next";
import BlogSchema, { IBlog } from "../../schema/blogSchema";
import mongoose, { connect } from "mongoose";

type PostData = {
  author: string;
  title: string;
  desc: string;
  editorContent: string;
  tags: string;
  category: string;
  photoLink: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const postData: PostData = req.body;

    const spacearray = postData.title.split(' ');
    let titleURL = "";
    spacearray.map((data, index) => {
      let spacer = "";
      if (index > 0) spacer = "-";
      titleURL += spacer + data
    });

    const newPost = new BlogSchema({
      _id: new mongoose.Types.ObjectId(),
      author: postData.author,
      title: postData.title,
      titleurl: titleURL,
      desc: postData.desc,
      body: postData.editorContent,
      category: postData.category,
      tags: postData.tags.split(","),
      img: postData.photoLink,
    });

    connect(process.env.PUBLIC_NEXT_MONGO_ACCESS!)
      .then(async () => {
        await newPost
          .save()
          .then(() => {
            res
              .status(200)
              .json({
                posted: true,
                titleurl: titleURL,
              });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(200)
              .json({ posted: false, connected: true, errBody: err });
          });
      })
      .catch((err) => {
        res.status(200).json({ posted: false, errBody: err });
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
