import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/sections/Navbar';
import Search from '@/components/Search';
import BlogBody from '@/sections/BlogBody';
import Footer from '@/sections/Footer';
import axios from 'axios';
import { IBlog } from '@/schema/blogSchema';
import Error from '@/components/Error';
import Loading from '@/components/Loading';

const Blog = () => {
  const _router = useRouter();
  const { pid } = _router.query;
  const [currentDoc, setCurrentDoc] = useState<IBlog | undefined>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (pid !== undefined) {
      const apiAddr = `/api/queries?action=searchexact&target=${pid}`;
      axios.get(apiAddr)
        .then((res) => {
          setCurrentDoc(res.data.data[0]);
        })
        .catch((err) => {
          setIsError(true);
        })
    }
  }, [pid])


  return (
    <>
      <Head>
        <title>{currentDoc ? (currentDoc.title) : 'Blog'} - Wayne Blogs</title>
        <meta name="description" content={currentDoc?.desc} />
        <meta name="author" content={currentDoc?.author} />
        <link rel="canonical" href={`https://wayneblog.vercel.app/blog/${currentDoc?.titleurl}`} />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Navbar />
      <main>
        {
          isError ? (
            <Error text="There was a problem fetching the document, please refresh the page" />
          ) : (
            currentDoc ? (
              <BlogBody blogInfo={currentDoc} />
            ) : (
              <Loading />
            )
          )
        }
        
        <Footer />
      </main>
    </>
  )
}


export default Blog