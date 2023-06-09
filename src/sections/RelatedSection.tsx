import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { IBlog } from '@/schema/blogSchema';
import BlogEntry from '@/components/BlogEntry';
import RightBox from '@/components/RightBox';

interface Props {
    tags: string,
    targetURL: string
}

const RelatedSection = ({ tags, targetURL }: Props) => {
    const [relatedBlogs, SetrelatedBlogs] = useState<IBlog[]>([]);
    const [categoryButtons, setCategoryButtons] = useState([]);
    useEffect(() => {

        const relatedLink = `/api/queries?action=relatedtopics&target=${encodeURIComponent(tags)}`;
        axios.get(relatedLink)
            .then((res) => {
                SetrelatedBlogs(res.data.data);
            })
            .catch(err => console.log(err));

        axios.get('/api/queries?action=getcategories&target=null')
            .then((res) => {
                setCategoryButtons(res.data.plaindata);
            })
            .catch(err => console.log);
    }, [tags]);

    return (
        <div className="related-blogs">
            <span className='related-blogs-title'>Related topics</span>
            <div className="body-container">
                <div className="body-container-left">
                    {
                        relatedBlogs && (
                            relatedBlogs.map((data, index) => (
                                data.titleurl !== targetURL && (
                                    <BlogEntry bEntry={data} key={index} />
                                )
                            ))
                        )
                    }
                </div>

                <div className="body-container-right">
                    {
                        categoryButtons.length > 0 && (
                            <RightBox title='Discover More' buttons={categoryButtons} />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default RelatedSection