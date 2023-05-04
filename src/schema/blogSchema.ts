import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
  _id: mongoose.Types.ObjectId;
  author: string;
  tstamp: Date;
  title: string;
  titleurl: string;
  body: {
    firstHeadingTitle: string;
    firstHeadingDesc: string;
    tableOfContents: string;
    inPageImage: string;
    text: string;
    FAQ: string;
  };
  desc: string;
  tags: [string];
  category: string;
  img: string;
  likes: number;
  dislikes: number;
}

const blogSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  author: String,
  tstamp: {
    type: Date,
    default: Date.now,
  },
  title: String,
  titleurl: String,
  body: {
    firstHeadingTitle: String,
    firstHeadingDesc: String,
    tableOfContents: String,
    inPageImage: String,
    text: String,
    FAQ: String,
  },
  desc: String,
  tags: {
    type: [String],
  },
  category: String,
  img: String,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

let BlogModel: mongoose.Model<IBlog>;

try {
  BlogModel = mongoose.model<IBlog>("BlogSchema");
} catch {
  BlogModel = mongoose.model<IBlog>("BlogSchema", blogSchema, "blogSchema");
}

export default BlogModel;
