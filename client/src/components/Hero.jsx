import React from 'react'
import resume from '../assets/resume.webp'
import '../App.css'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between px-4 py-8 items-center gap-8 max-w-[1200px] mx-auto overflow-hidden z-2">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl max-w-[600px] leading-[50px]">Craft Your Perfect Resume with <span className="text-blue-500 font-bold">ResumeCraft</span></h1>
        <div className="h-1 w-16 bg-black"></div>
        <p className="text-xl">Empowering Freshers to Land Their Dream Jobs</p>
      </div>
      <div className="w-[100%] h-[350px] sm:w-[450px] sm:h-[480px] overflow-hidden relative rounded">
        <div className="w-full h-8 absolute top-0 left-0 z-20 bg-gradient-to-b from-white to-transparent"></div>
        <img className="h-[700px] w-full object-fit absolute slide opacity-90 shadow-md" src={resume} alt='resume placeholder' />
        <div className="w-full h-8 absolute bottom-0 left-0 z-2 bg-gradient-to-b from-transparent to-white rounded"></div>
        <div></div>
      </div>
    </div>
  )
}

export default Hero
