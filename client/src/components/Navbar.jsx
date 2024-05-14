import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setLoggedIn, setLoggedOut, startLoading, stopLoading} from '../redux/slices/userSlice'
import { RxHamburgerMenu } from "react-icons/rx";
import '../App.css'

const Navbar = () => {

	const {logged} = useSelector((state)=>{
		return state.user
	})
	const [mobile, setMobile] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const verifyUser = async () => {
		try{
			dispatch(startLoading())
			const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/verify`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: 'include'
			})

			if(res.status === 200){
				dispatch(setLoggedIn())
			}

		}catch(e){
			toast.error(e.message)
		}
		dispatch(stopLoading())
	}

	const handleLogout = async()=>{
		dispatch(startLoading())
		setMobile(false)
		try{
			const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/signout`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: 'include'
			})

			if(res.status === 200){
				dispatch(setLoggedOut())
			}
			else{
				throw new Error("error")
			}
			
		}catch(e){
			toast.error(e.message)
		}
		navigate('/')
		dispatch(stopLoading())
	}

	const handleMobile = ()=>{
		setMobile(!mobile)
	}

	useEffect(()=>{
		verifyUser()
	}, [])

	return (
		<div className="flex justify-between items-center h-16 px-4 max-w-[1200px] mx-auto">
			<div className="text-2xl tracking-widest font-semibold"><Link to="/">ResumeCraft</Link></div>
			<div className={`flex-col sm:flex-row ${mobile?"flex":"hidden"} sm:flex bg-slate-200 sm:bg-white p-4 sm:p-0 rounded absolute top-16 right-4 z-10 sm:relative sm:top-0 sm:right-0 gap-2 nav-item`}>
				{logged && <Link to="/dashboard" className="px-3 py-[6px] bg-white text-black rounded hover:border hover:border-black" onClick={handleMobile}>Dashboard</Link>}
				{logged && <div className="px-3 py-[6px] bg-white text-black cursor-pointer rounded hover:border hover:border-black" onClick={handleLogout}>Signout</div>}
				{!logged && <Link to="/signup" className="px-3 py-[6px] bg-white text-black rounded hover:border hover:border-black" onClick={handleMobile}>SignUp</Link>}
				{!logged && <Link to="/signin" className="px-3 py-[6px] bg-blue-500 text-white font-semibold rounded" onClick={handleMobile}>SignIn</Link>}
			</div>
			<div className="hamburger sm:hidden" onClick={(e)=>setMobile(!mobile)}>
				<RxHamburgerMenu size={25}/>
			</div>
		</div>
	)
}

export default Navbar
