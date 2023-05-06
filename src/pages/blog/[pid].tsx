import Loading from '@/components/Loading'
import { Details } from '@/configs'
import { IBlog } from '@/schema/blogSchema'
import BlogBody from '@/sections/BlogBody'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'

interface BlogProps {
    currentDoc: IBlog | null
}

const Blog = ({ currentDoc }: BlogProps) => {
    return (
        <>

            <Head>
                <title>{currentDoc !== null ? currentDoc.title : "404"} - {Details.webName}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                {
                    currentDoc !== null && (
                        <>
                            <meta name="description" content={currentDoc.desc} />
                            <meta name='author' content={currentDoc.author} />
                            <meta property='article:published_time' content={new Date(currentDoc.tstamp).toISOString()} />
                            <link rel='canonical' href={`${Details.siteUrl}/blog/${currentDoc.titleurl}`} />
                        </>
                    )
                }

            </Head>
            <Navbar />
            <main>
                {
                    currentDoc ? (
                        <BlogBody blogInfo={currentDoc} />
                    ) : (
                        <Loading />
                    )
                }
                <Footer />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<BlogProps> = async (context) => {
    const API_URL = new URL(`/api/queries?action=searchexact&target=${context.query.pid}`, Details.siteUrl).toString();
    const res = await fetch(API_URL);

    //checking
    if (!res) {
        return {
            notFound: true
        }
    }
    const data = await res.json();
    const currentDoc = data.data[0];

    //If null|undefined return 404
    if (!currentDoc) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            currentDoc
        }
    }
}

export default Blog