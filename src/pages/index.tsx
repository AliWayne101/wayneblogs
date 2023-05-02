import Hero from '@/sections/Hero'
import MainBody from '@/sections/MainBody'
import Navbar from '@/sections/Navbar'
import React from 'react'

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MainBody infiniteData={false}/>
      </main>
    </>
  )
}

export default Index