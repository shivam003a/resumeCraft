import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import Loading from "./Laoding"
import {useSelector, useDispatch} from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"
import { setDetails } from '../redux/slices/resumeSlice'

const Basic = () => {

	const [basicDetail, setBasicDetail] = useState({
		mobile: "",
		linkedin: ""
	})
	const [codingDetails, setCodingDetails] = useState([
		{ codingTitle: "", codingLink: "" },
		{ codingTitle: "", codingLink: "" },
		{ codingTitle: "", codingLink: "" }
	])
	const { loading } = useSelector((state)=>{
		return state.user
	})
	const dispatch = useDispatch()

	const handleInput = (e) => {
		setBasicDetail((prev) => ({
			...prev, [e.target.name]: e.target.value
		}))
	}

	const handleCodingInput = (e, index) => {
		const updatedCodingDetails = [...codingDetails];
		updatedCodingDetails[index] = {
			...updatedCodingDetails[index],
			[e.target.name]: e.target.value,
		};
		setCodingDetails(updatedCodingDetails);
	}

	const handleSubmit = async (e)=>{
		e.preventDefault();

		dispatch(startLoading())
		try{
			const res = await fetch(`${import.meta.env.VITE_URL}/api/set/basic`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					basicDetail,
					codingDetails
				}),
				credentials: 'include'
			})

			const data = await res.json();

			if(res.status === 200){
				toast.success(data.msg)
				dispatch(setDetails(data))
			}
			else{
				throw new Error(data.msg)
			}

		}catch(e){
			toast.error(e.message)
		}
		dispatch(stopLoading())
	}

	return (
		<div className="w-full h-auto">
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<label htmlFor='mobile' className="text-md">Mobile</label>
					<input type="text" name="mobile" id="mobile" className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='mobile i.e. 1234567890' value={basicDetail.mobile} onChange={handleInput} />
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor='linkedin' className="text-md">Linkedin</label>
					<input type="text" name="linkedin" id="linkedin" className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='linkedin profile link' value={basicDetail.linkedin} onChange={handleInput} />
				</div>

				{
					codingDetails.map((codingDetail, index) => {
						return (
							<div className="flex flex-col gap-1" key={index}>
								<label htmlFor={`coding${index}`} className="text-md">{index+1}. Coding Profile</label>
								<div className="flex gap-1">
									<input type="text" name='codingTitle' className="w-[35%] px-4 py-2 border border-black rounded focus:outline-none" id={`coding${index}`} placeholder='coding platform' value={codingDetail.codingTitle} onChange={(e) => handleCodingInput(e, index)} />
									<input type="text" name="codingLink" className="w-[65%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='coding platform link' value={codingDetail.codingLink} onChange={(e) => handleCodingInput(e, index)} />
								</div>
							</div>
						)
					})
				}
				<button className="px-4 py-1 mt-4 w-fit min-w-[90.3px] min-h-[36px] bg-blue-500 text-lg text-white font-semibold rounded focus:outline-none" onClick={handleSubmit}>{
					loading? (<Loading />):("Submit")
				}</button>
			</form>
		</div>
	)
}

export default Basic
