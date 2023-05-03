import Search from '@/components/Search';
import Error from '@/components/Error';
import { IBlog } from '@/schema/blogSchema';
import Hero from '@/sections/Hero';
import Navbar from '@/sections/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Footer from '@/sections/Footer';
import Loading from '@/components/Loading';
import axios from 'axios';
import MainBody from '@/sections/MainBody';

const Index = () => {
  const _router = useRouter();
  const { pid } = _router.query;

  
  const [GotResult, setGotResult] = useState(false);
  const [Docs, setDocs] = useState<IBlog[]>([]);
  const [GotError, setGotError] = useState(false);

  useEffect(() => {
    const reqAddr = `/api/queries?action=search&target=${pid}`;
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
        <title>Searched {pid} - Wayne Blogs</title>
      </Head>
      <Navbar />
      <main>
        {
          GotResult ? (
            Docs.length > 0 ? (
              <MainBody primedDocs={Docs} infiniteData={false} />
            ) : (
              <>
                <Error text='No articles available for this' />
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

export default Index