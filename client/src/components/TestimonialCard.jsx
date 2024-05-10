import React from 'react'
import bg from '../assets/bg.jpg'
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

const TestimonialCard = () => {
    return (
        <div className='flex flex-col gap-2 items-center h-auto bg-slate-200 shadow-md p-4 rounded-sm relative w-60 sm:w-80 transition-all duration-200 hover:scale-110 cursor-pointer'>
            <img src={bg} className='w-16 h-16 rounded-full absolute -top-3 -left-3 object-cover' />
            <h3 className="text-lg font-semibold leading-6">Shivam Singh</h3>
            <span className="text-sm text-slate-500">BigThink / HR</span>
            <div className="flex gap-1">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStarOutline />
            </div>
            <h3 className="text-justify mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum veniam distinctio aut architecto repellat!</h3>
        </div>
    )
}

export default TestimonialCard
