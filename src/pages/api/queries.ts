import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import BlogSchema, { IBlog } from "../../schema/blogSchema";
import { connect } from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let results: { error?: Error; data?: IBlog[] | string; length?: number, plaindata?: string[] } = {};
  let success_code = 200;

  const action = req.query.action;
  //Write conditions here
  await connect(process.env.PUBLIC_NEXT_MONGO_ACCESS!)
    .then(async () => {
      //Write action here
      if (req.query.target !== undefined) {
        const target = req.query.target;
        if (action === "relatedtopics") {
          //const searchTags = req.query.target?.split('#') ?? [];
          let searchTags: string[];
          if (typeof req.query.target === "string") {
            searchTags = req.query.target.split("#");
          } else {
            searchTags = req.query.target;
          }

          BlogSchema.find({
            tags: { $in: searchTags },
          })
            .limit(5)
            .exec()
            .then((docs: IBlog[]) => {
              results = {
                data: docs,
                length: docs.length,
              };

              res.status(200).json(results);
            })
            .catch((err: Error) => {
              results = {
                error: err,
              };
              res.status(500).json(results);
            });
        } else if (action === "showBlogs") {
          if (target === 'some') {
            BlogSchema.find()
            .sort({ tstamp: -1 })
            .limit(5)
            .exec()
            .then((docs: IBlog[]) => {
              results = {
                data: docs,
              };
              res.status(200).json(results);
            })
            .catch((err: Error) => {
              results = {
                error: err,
              };
              res.status(500).json(results);
            });
          } else {
            BlogSchema.find()
            .sort({ tstamp: -1 })
            .exec()
            .then((docs: IBlog[]) => {
              results = {
                data: docs,
              }
              
              res.status(200).json(results);
            })
            .catch((err: Error) => {
              results = {
                error: err,
              };
              res.status(500).json(results);
            });
          }
        } else if (action === "searchexact") {
          BlogSchema.find({ titleurl: target })
          .exec()
          .then((doc) => {
            results = {
              data: doc
            }
            res.status(200).json(results);
          })
          .catch((err: Error) => {
            results = {
              error: err,
            }
            
            res.status(500).json(results);
          })
        } else if (action === 'getcategories') {
          BlogSchema.find()
          .exec()
          .then((docs) => {
            let tempArray: string[] = [];
            docs.map((doc) => {
              if (!tempArray.includes(doc.category)) {
                tempArray.push(doc.category);
              }
            });

            results = {
              plaindata: tempArray
            }
            
            res.status(200).json(results);
          })
          .catch((err: Error) => {
            results = {
              error: err,
            }
            
            res.status(500).json(results);
          })
        } else if (action === "category") {
          BlogSchema.find({ category: target })
          .sort({ tstamp: -1 })
          .exec()
          .then((docs) => {
            results = {
              data: docs
            }
            res.status(200).json(results);
          })
          .catch((err) => {
            results = {
              error: err,
            }
            
            res.status(500).json(results);
          })
        }
        // end of statement
      }
    })
    .catch((err) => {
      results = {
        error: err,
      };
      res.status(500).json(results);
    });
};

export default handler;
