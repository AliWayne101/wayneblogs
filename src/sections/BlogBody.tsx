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
import { GrLike, GrDislike } from 'react-icons/gr';
import Image from 'next/image';

const BlogBody = ({ blogInfo }: { blogInfo: IBlog }) => {

    const [webAddr, setWebAddr] = useState('');
    const [primedTags, setPrimedTags] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const likePost = () => {
        setLikes(likes + 1);
        updatePost('like');
    }

    const dislikePost = () => {
        setDislikes(dislikes + 1);
        updatePost('dislike');
    }

    const updatePost = (action: string) => {
        axios.get(`/api/queries/?action=${action}&target=${blogInfo._id}`);
    }

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
        setLikes(blogInfo.likes);
        setDislikes(blogInfo.dislikes);

    }, [blogInfo]);

    return (
        <div className="detailed-blog">
            <div className="detailed-blog-userbox">
                <div className="detailed-blog-userbox-left">
                    <span className='detailed-blog-userbox-left-author'>{blogInfo.author}</span>
                    <span className='detailed-blog-userbox-left-tstamp'>{new Date(blogInfo.tstamp).toString()}</span>
                    <span className='detailed-blog-userbox-left-buttons'>
                        {likes} <span className='clickable'><GrLike size={12} onClick={likePost} /></span> {dislikes} <span className='clickable'><GrDislike size={12} onClick={dislikePost} /></span>
                    </span>
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

                <div className="detailed-blog-body-inner">
                    <h1>{blogInfo.body.firstHeadingTitle}</h1>
                    <p>{blogInfo.body.firstHeadingDesc}</p>
                    <div className="detailed-blog-body-toc">
                        <div className="detailed-blog-body-toc-left">
                            <h2>Table of Contents</h2>
                            <ul>
                                {blogInfo.body.tableOfContents.split('#').map((data, index) => (
                                    <li key={index}>{data}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="detailed-blog-body-toc-right">
                            <Image alt={blogInfo.title} height={430} width={600} src={blogInfo.body.inPageImage} />
                        </div>
                    </div>

                    <div className="detailed-blog-body-inner-text" dangerouslySetInnerHTML={{ __html: blogInfo.body.text }}></div>

                    <div className="detailed-blog-body-inner-faq">
                        <h1>F.A.Q</h1>
                        <ol>
                            {
                                blogInfo.body.FAQ.split('#').map((data, index) => (
                                    <>
                                        <li key={index}>{data.split(';')[0]}</li>
                                        <ul>
                                            <li>{data.split(';')[1]}</li>
                                        </ul>
                                    </>
                                ))
                            }
                        </ol>
                    </div>

                </div>

            </div>
            {
                primedTags !== '' ? (
                    <RelatedSection tags={primedTags} targetURL={blogInfo.titleurl} />
                ) : (
                    <Loading />
                )
            }
        </div>
    )
}

export default BlogBody