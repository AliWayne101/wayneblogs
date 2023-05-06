import React from 'react';
import Button from './Button';
import Image from 'next/image';
import { IBlog } from '@/schema/blogSchema';
import Link from 'next/link';

const BlogEntry = ({ bEntry }: { bEntry: IBlog }) => {
    return (
        <div className="blog">
            <div className="blog-text">
                <div className="blog-text-uploaded"><span>{bEntry.author}</span> in <span><Link href={`/category/${bEntry.category}`} className='link'>{bEntry.category}</Link></span></div>
                <div className="blog-text-title">
                    <Link href={`/blog/${bEntry.titleurl}`} className='link'>{bEntry.title}</Link>
                </div>
                <div className="blog-text-short-desc">{bEntry.desc}</div>
                <div className="blog-text-button">
                    <Button text="Read more.." link={`/blog/${bEntry.titleurl}`} />
                </div>
                <div className="blog-text-info">
                    <span className='_tstamp'>{new Date(bEntry.tstamp.toString()).toDateString()}</span>
                    <span className='tags'>
                    {
                        bEntry.tags.map((data, index) => (
                            index > 0 ? (`, ${data}`) : (data)
                        ))
                    }
                    </span>
                </div>
            </div>
            <div className="blog-image">
                <Image src={bEntry.img} alt={bEntry.title} fill />
            </div>
        </div>
    )
}

export default BlogEntry