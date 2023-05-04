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
        <meta name="description" content='Discover a world of ideas, insights, and inspiration with our diverse range of expertly crafted content. From the latest trends to timeless classics, our blog has something for everyone. Join the conversation today and let us guide you on your journey of knowledge and discovery.' />
        <meta name="author" content='Ali Wains' />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta name="google-site-verification" content="b7D9w3jLmQYeXyUi9jsyf7NsdHZiOGZkCQpfQ3HBb5o" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <MainBody infiniteData={false} primedDocs={null} />
      </main>
    </>
  )
}

export default Index