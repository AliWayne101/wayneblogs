import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { IBlog } from '@/schema/blogSchema';
import Footer from '@/sections/Footer';
import MainBody from '@/sections/MainBody';
import Navbar from '@/sections/Navbar';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react'

const Category = () => {

    const _router = useRouter();
    const { pid } = _router.query;

    const mainRef = useRef<HTMLElement>(null);

    const [GotResult, setGotResult] = useState(false);
    const [Docs, setDocs] = useState<IBlog[]>([]);
    const [GotError, setGotError] = useState(false);

    useEffect(() => {
        const reqAddr = `/api/queries?action=category&target=${pid}`;
        axios.get(reqAddr)
            .then((res) => {
                setGotResult(true);
                setDocs(res.data.data);
            })
            .catch((err) => {
                console.log('Got Error');
                setGotError(true);
            });

        console.log('PID changed');
        if (mainRef.current) {
            mainRef.current.focus();
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [pid]);

    return (
        <>
            <Head>
                <title>{pid} - Wayne Blogs</title>
                <meta name="description" content='Discover a world of ideas, insights, and inspiration with our diverse range of expertly crafted content. From the latest trends to timeless classics, our blog has something for everyone. Join the conversation today and let us guide you on your journey of knowledge and discovery.' />
                <meta name="author" content='Ali Wains' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <Navbar />
            <main ref={mainRef}>
                {
                    GotResult ? (
                        Docs.length > 0 ? (
                            <MainBody infiniteData={true} primedDocs={Docs} />
                        ) : (
                            <>
                                <Error text='No articles available in this category' />
                                <Footer />
                            </>
                        )
                    ) : (
                        GotError ? (
                            <Error text='Seem we are facing some technical issues, kindly refresh the page' />
                        ) : (
                            <Loading />
                        )
                    )
                }
            </main>
        </>
    )
}

export default Category