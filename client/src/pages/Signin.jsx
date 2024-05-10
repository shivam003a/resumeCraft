import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLoggedIn, startLoading, stopLoading } from '../redux/slices/userSlice'

const Signin = () => {

	const [user, setUser] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const handleInput = (e) => {
		const { name, value } = e.target
		setUser(prev => ({
			...prev, [name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		dispatch(startLoading())
		const { email, password, confirmPassword } = user
		try {
			if (!email || !password || !confirmPassword) {
				throw new Error("input field can't be empty")
			}
			if (password != confirmPassword) {
				throw new Error("password does not match")
			}

			const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/signin`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user),
				credentials: 'include'
			})
			const data = await res.json()

			if (res.status === 200) {
				toast.success(data.msg)
				navigate('/dashboard')
				dispatch(setLoggedIn())
			}
			else {
				throw new Error(data.msg)
			}

		} catch (e) {
			toast.error(e.message)
		}
		dispatch(stopLoading())
	}

	return (
		<div className="max-w-[1200px] mx-auto px-4 py-8">
			<div className="flex flex-col gap-4 shadow-lg bg-slate-100 rounded max-w-[90%] sm:max-w-[50%] lg:max-w-[35%] py-16 px-4 mx-auto">
				<h3 className="text-2xl mb-6">Sign In to <span className="text-blue-500">ResumeCraft</span></h3>
				<form className="flex flex-col gap-3">
					<input type='email' placeholder='email i.e johndoe@mail.com' className="px-4 py-2 border border-black rounded focus:outline-none" name="email" value={user.email} onChange={handleInput} />
					<input type='password' placeholder='password' className="px-4 py-2 border border-black rounded focus:outline-none" name="password" value={user.password} onChange={handleInput} />
					<input type='password' placeholder='confirm password' className="px-4 py-2 border border-black rounded focus:outline-none" name="confirmPassword" value={user.confirmPassword} onChange={handleInput} />
					<button className="px-4 py-2 border rounded bg-blue-500 mt-6 w-fit text-white font-semibold" onClick={handleSubmit}>SignIn Now!</button>
				</form>
				<p className="text-base mt-3">Don't have an account yet? <span><Link to="/signup" className="underline">Sign Up Here</Link></span></p>
			</div>
		</div>
	)
}

export default Signin
