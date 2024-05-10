import React from 'react'
import { FcEngineering } from "react-icons/fc";

const Card = ({details}) => {
  return (
    <div className="flex flex-col gap-2 w-[220px] px-4 py-4 rounded bg-slate-100 shadow-md group cursor-pointer hover:bg-blue-500 transition-all duration-300">
      <FcEngineering size={40} />
      <h3 className="text-xl text-left text-blue-500 group-hover:text-white">{details.title}</h3>
      <div className="h-1 w-8 bg-blue-500 group-hover:bg-white group-hover:w-16 transition-all duration-200"></div>
      <p className="text-sm text-left group-hover:text-white">{details.desc}</p>
    </div>
  )
}

export default Card
