import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setLoggedIn, setLoggedOut, startLoading, stopLoading} from '../redux/slices/userSlice'

const Navbar = () => {

	const {logged} = useSelector((state)=>{
		return state.user
	})
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

	useEffect(()=>{
		verifyUser()
	}, [])

	return (
		<div className="flex justify-between items-center h-16 px-4 max-w-[1200px] mx-auto">
			<div className="text-2xl tracking-widest font-semibold"><Link to="/">ResumeCraft</Link></div>
			<div className="flex gap-2">
				{logged && <Link to="/dashboard" className="px-3 py-[6px] bg-white text-black rounded hover:border hover:border-black">Dashboard</Link>}
				{logged && <div className="px-3 py-[6px] bg-white text-black cursor-pointer rounded hover:border hover:border-black" onClick={handleLogout}>Signout</div>}
				{!logged && <Link to="/signup" className="px-3 py-[6px] bg-white text-black rounded hover:border hover:border-black">SignUp</Link>}
				{!logged && <Link to="/signin" className="px-3 py-[6px] bg-blue-500 text-white font-semibold rounded">SignIn</Link>}
			</div>
		</div>
	)
}

export default Navbar
