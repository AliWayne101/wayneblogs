import Hero from '@/sections/Hero'
import MainBody from '@/sections/MainBody'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import React from 'react'

function Index() {
  return (
    <>
      <Head>
        <title>WayneBlogs</title>
      </Head>
      <Navbar />
      <main>
        <Hero />
          <MainBody infiniteData={false} primedDocs={null}/>
      </main>
    </>
  )
}

export default Index