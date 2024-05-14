import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'react-hot-toast'
import Loading from "./Laoding"
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"
import { setDetails } from '../redux/slices/resumeSlice'

const Certificates = () => {

	const [certificateDetails, setCertificateDetails] = useState([
		{
			certificateTitle: "",
			certificateIssuer: "",
			certificateDate: ""
		}
	])
	const { loading } = useSelector((state) => {
		return state.user
	})
	const dispatch = useDispatch()

	const handleMoreDetails = () => {
		const updatedArray = [...certificateDetails];
		updatedArray.push({
			certificateTitle: "",
			certificateIssuer: "",
			certificateDate: ""
		})
		setCertificateDetails(updatedArray)
	}

	const handleInput = (e, index) => {
		const updatedCertificateDetail = [...certificateDetails]
		updatedCertificateDetail[index] = ({
			...updatedCertificateDetail[index],
			[e.target.name]: e.target.value
		})
		setCertificateDetails(updatedCertificateDetail)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(startLoading())

		try {
			const res = await fetch(`${import.meta.env.VITE_URL}/api/set/certificates`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					certificateDetails
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
					certificateDetails.map((certificateDetail, index) => {
						return (
							<div className="flex flex-col gap-1" key={index}>
								<label htmlFor={`certificateTitle${index + 1}`} className="text-md">{index + 1}. Certifications</label>
								<input type="text" name='certificateTitle' id={`certificateTitle${index + 1}`} className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='certification name' onChange={(e) => handleInput(e, index)} value={certificateDetail.certificateTitle} />
								<div className='flex gap-1'>
									<input type="text" name='certificateIssuer' className="w-[50%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='certification issuer' onChange={(e) => handleInput(e, index)} value={certificateDetail.certificateIssuer} />
									<input type="date" name='certificateDate' className="w-[50%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='certification date' onChange={(e) => handleInput(e, index)} value={certificateDetail.certificateDate} />
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

export default Certificates
