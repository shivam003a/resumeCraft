import React from 'react'
import mployee from '../assets/mployee.webp'
import resumeworded from '../assets/resumeworded.jpg'

const Ats = () => {

    const openSite = (link)=>{
        window.open(link, "_blank")
    }
    return (
        <div className="flex flex-col items-center px-4 py-8 max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-3xl font-semibold text-center">Checkout ATS Score!</h1>
                <div className="h-1 w-16 bg-blue-500"></div>
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-8 w-full justify-center mt-[60px]">
                <img src={mployee} className="w-60 h-28 grayscale cursor-pointer" onClick={(e)=>openSite("https://www.mployee.me/")}/>
                <img src={resumeworded} className="w-60 h-28 grayscale cursor-pointer" onClick={(e)=>openSite("https://resumeworded.com/")}/>
            </div>
        </div>
    )
}

export default Ats
