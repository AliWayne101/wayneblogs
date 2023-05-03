import type { NextApiRequest, NextApiResponse } from 'next';
import BlogSchema, { IBlog } from "../../schema/blogSchema";

type PostData = {
  author: string;
  title: string;
  desc: string;
  tags: string;
  category: string;
  photoLink: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const postData: PostData = req.body;

    const newPost = new BlogSchema({
        author: postData.author,
        title: postData.title,
        titleurl: encodeURIComponent(postData.title),
        desc: postData.desc,
        category: postData.category,
        tags: postData.tags.split(','),
        img: postData.photoLink
    });
    
    await newPost.save().catch((err) => {
        console.log(err);
    });
    res.status(200).json({posted: true, titleurl: encodeURIComponent(postData.title)});
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
