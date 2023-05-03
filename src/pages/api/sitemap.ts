import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import BlogSchema, { IBlog } from "../../schema/blogSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // generate sitemap here

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
        <loc>https://wayneblogs.vercel.app/</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>  
    <url>
        <loc>https://wayneblogs.vercel.app/privacy</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>
      <url>
        <loc>https://wayneblogs.vercel.app/terms</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>
      <url>
        <loc>https://wayneblogs.vercel.app/about</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>
      <url>
        <loc>https://wayneblogs.vercel.app/blog</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>
      <url>
        <loc>https://wayneblogs.vercel.app/contact</loc>
        <lastmod>2023-04-30T21:00:54+00:00</lastmod>
      </url>
      `;

  await connect(process.env.PUBLIC_NEXT_MONGO_ACCESS!)
    .then(() => {
      BlogSchema.find()
        .exec()
        .then(async (docs) => {
          let allPageData = "";
          await Promise.all(
            docs.map(async (doc) => {
              allPageData += `
                  <url>
                    <loc>https://wayneblogs.vercel.app/blog/${doc.titleurl}</loc>
                    <lastmod>${doc.tstamp.toISOString()}</lastmod>
                  </url>
                `;
            })
          );

          xml += allPageData + "</urlset>";
          res.end(xml);
        })
        .catch((err) => {
          xml += "</urlset>";
          res.end(xml);
        });
    })
    .catch((err) => {
      xml += "</urlset>";
      res.end(xml);
    });
}
