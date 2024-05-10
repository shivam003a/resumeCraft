import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast"

const Education = () => {

	const [eduDetails, setEduDetails] = useState([{
		eduTitle: "",
		eduCourse: "",
		eduMajor: "",
		eduMarks: "",
		eduFromDate: "",
		eduTillDate: ""
	}])

	const handleInput = (e, index) => {
		const updatedArray = [...eduDetails]
		updatedArray[index] = {
			...updatedArray[index],
			[e.target.name]: e.target.value
		}
		setEduDetails(updatedArray)
	}

	const handleMoreDetails = () => {
		const updatedArray = [...eduDetails];
		updatedArray.push({
			eduTitle: "",
			eduCourse: "",
			eduMajor: "",
			eduMarks: "",
			eduFromDate: "",
			eduTillDate: ""
		})
		setEduDetails(updatedArray)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await fetch(`${import.meta.env.VITE_URL}/api/set/education`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					eduDetails
				}),
				credentials: 'include'
			})

			const data = await res.json();

			if (res.status === 200) {
				toast.success(data.msg)
			}
			else {
				throw new Error(data.msg)
			}

		} catch (e) {
			toast.error(e.message)
		}
	}

	return (
		<div className="w-full h-auto">
			<form className="flex flex-col gap-4">
				{
					eduDetails.map((eduDetail, index) => {
						return (
							<div className="flex flex-col gap-1" key={index}>
								<label htmlFor={`eduTitle${index + 1}`} className="text-md">{index + 1}. Education</label>
								<input type="text" name='eduTitle' id={`eduTitle${index + 1}`} className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='school/college name' onChange={(e) => handleInput(e, index)} value={eduDetail.eduTitle} />
								<div className='flex gap-1'>
									<input type="text" name='eduCourse' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='course' onChange={(e) => handleInput(e, index)} value={eduDetail.eduCourse} />
									<input type="text" name='eduMajor' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='major (leave blank for 10th/12th)' onChange={(e) => handleInput(e, index)} value={eduDetail.eduMajor} />
								</div>
								<div className='flex gap-1'>
									<input type="text" name='eduMarks' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='aggregate cgpa/%' onChange={(e) => handleInput(e, index)} value={eduDetail.eduMarks} />
									<input type="date" name='eduFromDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='from' onChange={(e) => handleInput(e, index)} value={eduDetail.eduFromDate} />
									<input type="date" name='eduTillDate' className="w-[100%] px-4 py-2 border border-black rounded focus:outline-none" placeholder='to' onChange={(e) => handleInput(e, index)} value={eduDetail.eduTillDate} />
								</div>
							</div>
						)
					})
				}
				<div className="flex justify-between items-center">
					<button className="px-4 py-1 mt-4 w-fit bg-blue-500 text-lg text-white font-semibold rounded focus:outline-none" onClick={handleSubmit}>Submit</button>
					<div onClick={handleMoreDetails}><IoIosAddCircleOutline size={25} className="mt-4" /></div>
				</div>
			</form>
		</div>
	)
}

export default Education
