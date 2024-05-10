import React from 'react'
import '../App.css'
import Hero from '../components/Hero'
import Features from '../components/Features'
import blueShape from '../assets/blueShape.svg'
import blueShapeInverted from '../assets/blueShapeInverted.svg'
import Testimonials from '../components/Testimonials'
import Ats from '../components/Ats'

const Home = () => {
  return (
    <div>
      <div className="w-full h-auto relative">
        <Hero />
        <img src={blueShape} className='absolute bottom-0 left-0 right-0 -z-30' />
      </div>
      <div className="w-full h-auto relative bg-blue-500">
        <Features />
      </div>
      <div className="w-full h-auto relative">
        <Testimonials />
        <img src={blueShapeInverted} className='absolute top-0 left-0 right-0 -z-10' />
      </div>
      <div className="w-full h-auto relative">
        <Ats />
      </div>
    </div>
  )
}

export default Home
