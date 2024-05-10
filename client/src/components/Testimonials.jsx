import React from 'react'
import { Link } from 'react-router-dom'
import TestimonialCard from './TestimonialCard';



const Testimonials = () => {
	return (
		<div className="flex flex-col items-center px-4 py-8 max-w-[1200px] mx-auto">
			<div className="flex flex-col items-center gap-3">
				<h1 className="text-3xl font-semibold">Testimonials</h1>
				<div className="h-1 w-16 bg-black"></div>
			</div>
			<div className="flex flex-wrap justify-center w-full gap-12 mt-[80px] py-4">
				<TestimonialCard />
				<TestimonialCard />
				<TestimonialCard />
			</div>
		</div>
	)
}

export default Testimonials
