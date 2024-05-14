import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast"
import Loading from "./Laoding"
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"
import { setDetails } from '../redux/slices/resumeSlice'

const Experience = () => {

	const [eDetails, setEDetails] = useState([{
		eTitle: "",
		eLink: "",
		eBullet1: "",
		eBullet2: "",
		eBullet3: "",
		eFromDate: "",
		eTillDate: ""
	}])
	const { loading } = useSelector((state) => {
		return state.user
	})
	const dispatch = useDispatch()

	const handleInput = (e, index) => {
		const updatedArray = [...eDetails]
		updatedArray[index] = {
			...updatedArray[index],
			[e.target.name]: e.target.value
		}
		setEDetails(updatedArray)
	}

	const handleMoreDetails = () => {
		const updatedArray = [...eDetails];
		updatedArray.push({
			eTitle: "",
			eLink: "",
			eBullet1: "",
			eBullet2: "",
			eBullet3: "",
			eFromDate: "",
			eTillDate: ""
		})
		setEDetails(updatedArray)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(startLoading())

		try {
			const res = await fetch(`${import.meta.env.VITE_URL}/api/set/experience`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					eDetails
				}),
				credentials: 'include'
			})

			const data = await res.json();

			if (res.status === 200) {
				toast.success(data.msg)
				dispatch(setDetails(data))
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
		<div className="w-full h-auto">
			<form className="flex flex-col gap-4">
				{
					eDetails.map((eDetail, index) => {
						return (
							<div className="flex flex-col gap-1" key={index}>
								<label htmlFor={`eTitle${index + 1}`} className="text-md">{index + 1}. Experience</label>
								<input type="text" name='eTitle' id={`eTitle${index + 1}`} className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='experience position' onChange={(e) => handleInput(e, index)} value={eDetail.eTitle} />
								<input type="text" name='eCom' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='company' onChange={(e) => handleInput(e, index)} value={eDetail.eCom} />
								<input type="text" name='eBullet1' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about experience bullet 1' onChange={(e) => handleInput(e, index)} value={eDetail.eBullet1} />
								<input type="text" name='eBullet2' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about experience bullet 2' onChange={(e) => handleInput(e, index)} value={eDetail.eBullet2} />
								<input type="text" name='eBullet3' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about experience bullet 3' onChange={(e) => handleInput(e, index)} value={eDetail.eBullet3} />
								<div className='flex gap-1'>
									<input type="date" name='eFromDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='from' onChange={(e) => handleInput(e, index)} value={eDetail.eFromDate} />
									<input type="date" name='eTillDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='to' onChange={(e) => handleInput(e, index)} value={eDetail.eTillDate} />
								</div>
							</div>
						)
					})
				}
				<div className="flex justify-between items-center">
					<button className="px-4 py-1 mt-4 w-fit min-w-[90.3px] min-h-[36px] bg-blue-500 text-lg text-white font-semibold rounded focus:outline-none" onClick={handleSubmit}>{
						loading ? (<Loading />) : ("Submit")
					}</button>
					<div onClick={handleMoreDetails}><IoIosAddCircleOutline size={25} className="mt-4" /></div>
				</div>
			</form>
		</div>
	)
}

export default Experience
