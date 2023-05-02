import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton
} from 'next-share';
import { IBlog } from '@/schema/blogSchema';
import RelatedSection from './RelatedSection';
import Loading from '@/components/Loading';

const BlogBody = ({ blogInfo }: { blogInfo: IBlog }) => {

    const [webAddr, setWebAddr] = useState('');
    const [primedTags, setPrimedTags] = useState('');

    useEffect(() => {
        axios.get('/api/getAddr')
            .then((res) => {
                setWebAddr(res.data);
            }).catch(err => console.log);

        let tagsurl = "";
        blogInfo.tags.map((data, index) => {
            let sep = "";
            if (index > 0) sep = "#";
            tagsurl += sep + data;
        });
        setPrimedTags(tagsurl);
    }, [blogInfo]);

    return (
        <div className="detailed-blog">
            <div className="detailed-blog-userbox">
                <div className="detailed-blog-userbox-left">
                    <span className='detailed-blog-userbox-left-author'>{blogInfo.author}</span>
                    <span className='detailed-blog-userbox-left-tstamp'>{new Date(blogInfo.tstamp).toString()}</span>
                </div>
                <div className="detailed-blog-userbox-right">
                    {
                        webAddr !== '' && (
                            <>
                                <TwitterShareButton
                                    url={`${webAddr}/blog/${blogInfo.titleurl}`}
                                    title={blogInfo.title}
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                &nbsp;
                                <FacebookShareButton
                                    url={`${webAddr}/blog/${blogInfo.titleurl}`}
                                    title={blogInfo.title}
                                    quote={blogInfo.desc}
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="detailed-blog-body">
                <div className="detailed-blog-body-title">{blogInfo.title}</div>
                <div className="detailed-blog-body-inner" dangerouslySetInnerHTML={{ __html: blogInfo.body }}></div>
            </div>
            {
                primedTags !== '' ? (
                    <RelatedSection tags={primedTags} />
                ) : (
                    <Loading />
                )
            }
        </div>
    )
}

export default BlogBody