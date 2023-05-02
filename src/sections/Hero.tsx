import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className="hero">
        <h1 className="hero-title">Stay Curious!</h1>
        <p className="hero-text">
          Discover stories, thinking, and expertise <br />from writers on any topic.<br />
          by <Link href='https://waynedev.vercel.app' target='_blank' className='link'>WayneDev</Link>
        </p>
        <div className="hero-button">
          <Button text='Start Reading..' link='/blog/' />
        </div>
    </div>
  )
}

export default Hero