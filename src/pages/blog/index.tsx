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
            </Head>
            <Navbar />
            <main>
                <MainBody infiniteData={true} primedDocs={null}/>
            </main>
        </>
    )
}

export default Index