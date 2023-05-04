import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import Head from 'next/head'
import React from 'react'

const About = () => {
  return (
    <>
      <Head>
        <title>About - WayneBlogs</title>
        <meta name="description" content='Discover a world of ideas, insights, and inspiration with our diverse range of expertly crafted content. From the latest trends to timeless classics, our blog has something for everyone. Join the conversation today and let us guide you on your journey of knowledge and discovery.' />
        <meta name="author" content='Ali Wains' />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <div className="page-body">
          <p>Welcome to my world, where coding and creativity collide to create a unique and exciting user experience. As a solo developer and blog owner, I am passionate about bringing innovative solutions to everyday problems and making technology accessible to everyone.</p>
          <p>My journey began when I was young and fascinated by the potential of computers to change the world. Over the years, I honed my skills and became proficient in multiple programming languages and web development frameworks. As I worked on various projects, I realized that I had a knack for turning complex ideas into elegant and easy-to-use solutions.</p>
          <p>As the owner of this blog, I am committed to sharing my knowledge and experience with others. Whether you&apos;re a seasoned developer or a beginner just starting out, you&apos;ll find valuable insights and practical tips that will help you grow your skills and achieve your goals. From tutorials and guides to reviews and analysis, my blog covers a wide range of topics that are relevant to developers, designers, and tech enthusiasts.</p>
          <p>At the heart of everything I do is a desire to push the boundaries of what&apos;s possible and create amazing experiences for users. I believe that technology has the power to transform lives and shape the future, and I&apos;m excited to be a part of that journey.</p>
          <p>So join me on this adventure as we explore the latest trends, share our insights, and discover new ways to build innovative and exciting solutions. Together, we can build a brighter future for ourselves and for generations to come.</p>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default About