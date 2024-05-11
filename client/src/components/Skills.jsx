import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loading from "./Laoding"
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"

const Skills = () => {

	const [skills, setSkills] = useState("");
	const { loading } = useSelector((state) => {
		return state.user
	})
	const dispatch = useDispatch()

	const handleInput = (e) => {
		setSkills(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(startLoading())

		if (!skills) {
			toast.success("skills are empty")
		}
		else {
			let skillsArray = skills.split(",");
			skillsArray = skillsArray.map((skill) => {
				return skill.trim()
			})

			console.log(skillsArray)

			try {
				const res = await fetch(`${import.meta.env.VITE_URL}/api/set/skills`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						skillsArray: skillsArray
					}),
					credentials: 'include'
				})
				const data = await res.json();

				if (res.status === 200) {
					toast.success(data.msg);
				}
				else {
					toast.error(data.msg)
				}
			} catch (e) {
				toast.error(e.message)
			}
		}
		dispatch(stopLoading())
	}

	return (
		<div className="w-full h-auto">
			<form className="flex flex-col gap-4" method='POST'>
				<div className="flex flex-col gap-1">
					<label htmlFor='skills' className="text-md">Skills</label>
					<input type="text" name='skills' id='skills' className="px-4 py-2 border border-black rounded focus:outline-none" placeholder='enter skills seperated by commas, maximum 12 skills' value={skills} onChange={handleInput} />
				</div>
				<button className="px-4 py-1 mt-4 w-fit min-w-[90.3px] min-h-[36px] bg-blue-500 text-lg text-white font-semibold rounded focus:outline-none" onClick={handleSubmit}>{
					loading ? (<Loading />) : ("Submit")
				}</button>
			</form>
		</div>
	)
}

export default Skills
