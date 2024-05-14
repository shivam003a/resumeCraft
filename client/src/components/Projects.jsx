import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast"
import Loading from "./Laoding"
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"
import { setDetails } from '../redux/slices/resumeSlice'

const Projects = () => {

	const [pDetails, setPDetails] = useState([{
		pTitle: "",
		pLink: "",
		pBullet1: "",
		pBullet2: "",
		pBullet3: "",
		pFromDate: "",
		pTillDate: ""
	}])
	const { loading } = useSelector((state) => {
		return state.user
	})
	const dispatch = useDispatch()

	const handleInput = (e, index) => {
		const updatedArray = [...pDetails]
		updatedArray[index] = {
			...updatedArray[index],
			[e.target.name]: e.target.value
		}
		setPDetails(updatedArray)
	}

	const handleMoreDetails = () => {
		const updatedArray = [...pDetails];
		updatedArray.push({
			pTitle: "",
			pLink: "",
			pBullet1: "",
			pBullet2: "",
			pBullet3: "",
			pFromDate: "",
			pTillDate: ""
		})
		setPDetails(updatedArray)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(startLoading())

		try {
			const res = await fetch(`${import.meta.env.VITE_URL}/api/set/projects`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					pDetails
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
					pDetails.map((pDetail, index) => {
						return (
							<div className="flex flex-col gap-1" key={index}>
								<label htmlFor={`pTitle${index + 1}`} className="text-md">{index + 1}. Project</label>
								<input type="text" name='pTitle' id={`pTitle${index + 1}`} className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='project title' onChange={(e) => handleInput(e, index)} value={pDetail.pTitle} />
								<input type="text" name='pLink' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='project link' onChange={(e) => handleInput(e, index)} value={pDetail.pLink} />
								<input type="text" name='pBullet1' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about project bullet 1' onChange={(e) => handleInput(e, index)} value={pDetail.pBullet1} />
								<input type="text" name='pBullet2' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about project bullet 2' onChange={(e) => handleInput(e, index)} value={pDetail.pBullet2} />
								<input type="text" name='pBullet3' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='about project bullet 3' onChange={(e) => handleInput(e, index)} value={pDetail.pBullet3} />
								<div className='flex gap-1'>
									<input type="date" name='pFromDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='from' onChange={(e) => handleInput(e, index)} value={pDetail.pFromDate} />
									<input type="date" name='pTillDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='to' onChange={(e) => handleInput(e, index)} value={pDetail.pTillDate} />
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

export default Projects
