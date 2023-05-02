import Error from '@/components/Error';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { IBlog } from '@/schema/blogSchema';
import Footer from '@/sections/Footer';
import Hero from '@/sections/Hero';
import MainBody from '@/sections/MainBody';
import Navbar from '@/sections/Navbar';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

const Category = () => {

    const _router = useRouter();
    const { pid } = _router.query;

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
    }, [pid]);

    return (
        <>
            <Head>
                <title>{ pid } - Wayne Blogs</title>
            </Head>
            <Navbar />
            <main>
                <Hero />
                <Search />
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
                            <Loading  />
                        )
                    )
                }
            </main>
        </>
    )
}

export default Category