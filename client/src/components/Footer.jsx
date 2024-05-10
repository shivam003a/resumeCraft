import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";

const Footer = () => {
    return (
        <div className="bg-blue-500">
            <div className="h-auto sm:h-[220px] flex flex-col sm:flex-row bg-blue-500 max-w-[1200px] mx-auto px-4 py-8 gap-8">
                <div className="flex flex-col text-white gap-12 justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-widest">ResumeCraft</h2>
                        <p className="text-sm">Empowering Freshers to Land Their Dream Jobs</p>
                    </div>
                    <p className="text-sm">Made with ❤️ by Shivam Singh</p>
                </div>

                <div className="h-full w-[0.5px] bg-white"></div>

                <div className="flex flex-col gap-1 justify-between">
                    <NavLink to='/' className="text-sm text-white underline">Home</NavLink>
                    <NavLink to='/' className="text-sm text-white underline">About Us</NavLink>
                    <NavLink to='/' className="text-sm text-white underline">Why Us?</NavLink>
                    <NavLink to='/signin' className="text-sm text-white underline">Signin</NavLink>
                    <NavLink to='/signup' className="text-sm text-white underline">Signup</NavLink>
                    <NavLink to='/' className="text-sm text-white underline">FAQ</NavLink>
                </div>

                <div className="h-full w-[0.5px] bg-white"></div>
                
                <div className="flex flex-col gap-4">
                    <p className="text-white text-lg ">Connect with Us:</p>
                    <div className="flex gap-3">
                        <Link to="https://www.instagram.com/shivam003a/" target='_blank'><BiLogoInstagramAlt size={30} color='white' /></Link>
                        <Link to="https://twitter.com/shivam003a" target='_blank'><BiLogoTwitter size={30} color='white'/></Link>
                        <Link to="https://www.linkedin.com/in/shivam003a/" target='_blank'><BiLogoLinkedinSquare size={30} color='white' /></Link>
                        <Link to="https://github.com/shivam003a/" target='_blank'><BiLogoGithub size={30} color='white' /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
