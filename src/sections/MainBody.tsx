import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import BlogEntry from '@/components/BlogEntry'
import axios from 'axios'
import { IBlog } from '@/schema/blogSchema'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import RightBox from '@/components/RightBox'
import Search from '@/components/Search'

interface Props {
    infiniteData: Boolean,
    primedDocs: IBlog[] | null
}

const MainBody = ({ infiniteData, primedDocs }: Props) => {

    const [docs, setdocs] = useState<IBlog[]>([]);
    const [gotResult, setGotResult] = useState(false);
    const [gotError, setGotError] = useState(false);
    const [categoryButtons, setCategoryButtons] = useState([]);

    const target = infiniteData ? "all" : "some";

    useEffect(() => {
        if (primedDocs === null) {
            const reqAddr = `/api/queries?action=showBlogs&target=${target}`;
            axios.get(reqAddr)
                .then((res) => {
                    setGotResult(true);
                    setdocs(res.data.data);
                })
                .catch((err) => {
                    console.log('Got Error');
                    setGotError(true);
                });
        } else {
            setGotResult(true);
            setdocs(primedDocs);
        }
    }, [target, primedDocs]);

    useEffect(() => {

        axios.get('/api/queries?action=getcategories&target=null')
            .then((res) => {
                setCategoryButtons(res.data.plaindata);
            })
            .catch(err => console.log);
    }, [])


    return (
        <div className="body-container" id="recentblogs">
            <div className="body-container-left">
                {
                    gotResult ? (
                        docs.length > 0 ? (
                            docs.map((data: IBlog, index: number) => (
                                <BlogEntry bEntry={data} key={index} />
                            ))
                        ) : (
                            <Error text="No articles written yet!" />
                        )
                    ) : (
                        gotError ? (
                            <Error text="It seems something went wrong, try refreshing the page" />
                        ) : (
                            <Loading />
                        )
                    )
                }
            </div>
            <div className="body-container-right">
                <Search extraClass='smaller' />
                {categoryButtons.length > 0 && (
                    <RightBox title='Discover More' buttons={categoryButtons} />
                )}
                <Footer />
            </div>
        </div>
    )
}

export default MainBody