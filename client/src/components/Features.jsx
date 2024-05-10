import React from 'react'
import Card from './Card'

const cardContent = [
    {
        title: "Streamlined Process",
        desc: "Our user-friendly interface makes crafting a professional resume effortless. Simply input your details, and let our platform handle the rest"
    },
    {
        title: "ATS Compatibility",
        desc: "Ensure your resume gets noticed by applicant tracking systems with our ATS-friendly templates, designed to optimize your chances of passing through initial screenings"
    },
    {
        title: "Mobile Accessibility",
        desc: "Access our platform anytime, anywhere, from any device. Whether you're on your computer, tablet, or smartphone, creating your resume has never been more convenient"
    },
    {
        title: "Privacy and Security",
        desc: "Rest assured that your personal information is safe with us. We prioritize data security and privacy, ensuring that your information is never compromised"
    }
]

const Features = () => {
    return (
        <div className="flex flex-col items-center px-4 py-8 max-w-[1200px] mx-auto bg-blue-500">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-3xl font-semibold text-center">Why Choose <span className="text-white">ResumeCraft ?</span></h1>
                <div className="h-1 w-16 bg-white"></div>
            </div>
            <div className="flex flex-wrap justify-center w-full gap-12 mt-[80px] py-4">
                {cardContent.map((card, key) => {
                    return (<Card details={card} key={key} />)
                })}
            </div>
        </div>
    )
}

export default Features
