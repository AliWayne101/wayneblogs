import Hero from '@/sections/Hero'
import MainBody from '@/sections/MainBody'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import React, { useEffect } from 'react'
import Search from '@/components/Search';

const Index = () => {
    useEffect(() => {
        window.addEventListener('scroll', ()=> {
            if (window.pageYOffset >= window.innerHeight) console.log('page reached');
        })
    }, []);

    return (
        <>
            <Head>
                <title>Blog - Wayne Blogs</title>
                <meta name="description" content='Discover a world of ideas, insights, and inspiration with our diverse range of expertly crafted content. From the latest trends to timeless classics, our blog has something for everyone. Join the conversation today and let us guide you on your journey of knowledge and discovery.' />
                <meta name="author" content='Ali Wains' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <Navbar />
            <main>
                <MainBody infiniteData={true} primedDocs={null}/>
            </main>
        </>
    )
}

export default Index