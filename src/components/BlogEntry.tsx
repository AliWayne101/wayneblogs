import React from 'react';
import Button from './Button';
import Image from 'next/image';
import { IBlog } from '@/schema/blogSchema';

const BlogEntry = ({ bEntry }: { bEntry: IBlog }) => {
    return (
        <div className="blog">
            <div className="blog-text">
                <div className="blog-text-uploaded"><span>{bEntry.author}</span> in <span>{bEntry.category}</span></div>
                <div className="blog-text-title">{bEntry.title}</div>
                <div className="blog-text-short-desc">{bEntry.desc}</div>
                <div className="blog-text-button">
                    <Button text="Read more.." link={`/blog/${bEntry.titleurl}`} />
                </div>
                <div className="blog-text-info">
                    <span>{new Date(bEntry.tstamp.toString()).toDateString()}</span>
                    {
                        bEntry.tags.map((data, index) => (
                            <span key={index}>{data}</span>
                        ))
                    }
                </div>
            </div>
            <div className="blog-image">
                <Image src={bEntry.img} alt={bEntry.title} fill />
            </div>
        </div>
    )
}

export default BlogEntry