import React, { useEffect, useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf';
import '../App.css'
import Basic from '../components/Basic'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Certificates from '../components/Certificates'
import { toast } from 'react-hot-toast'
import Loading from "../components/Laoding"
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/slices/userSlice"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

const Dashboard = () => {


    const [currentPage, setCurrentPage] = useState("basic")
    const [pdfData, setPdfData] = useState(null)
    const { loading } = useSelector((state) => {
        return state.user
    })
    const dispatch = useDispatch()

    const components = {
        basic: <Basic />,
        education: <Education />,
        skills: <Skills />,
        projects: <Projects />,
        experience: <Experience />,
        certificates: <Certificates />
    }

    const handleSection = (e) => {
        const currentPageName = e.target.innerText.toLowerCase()
        setCurrentPage(currentPageName)
    }

    const getPdf = async () => {
        dispatch(startLoading())
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/api/resume/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.blob()

            if (res.status === 200) {
                setPdfData(data)
                toast.success("resume loaded")
            }
            else {
                throw new Error("error occured")
            }

        } catch (e) {
            console.error('Error fetching PDF:', e);
        }
        dispatch(stopLoading())
    }

    const downloadPdf = () => {
        if (pdfData) {
            const url = window.URL.createObjectURL(new Blob([pdfData]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'resume.pdf')
            link.click()
        }
        else {
            toast.error("pdf not availavble")
        }
    }

    useEffect(() => {
        getPdf()
    }, [currentPage])


    return (
        <div className="flex flex-col lg:flex-row gap-3 justify-between max-w-[1200px] mx-auto w-full px-4 py-8">
            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
                <div className="flex overflow-x-auto">
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'basic' ? 'active' : ''}`} onClick={handleSection}>Basic</div>
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'education' ? 'active' : ''}`} onClick={handleSection}>Education</div>
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'skills' ? 'active' : ''}`} onClick={handleSection}>Skills</div>
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'projects' ? 'active' : ''}`} onClick={handleSection}>Projects</div>
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'experience' ? 'active' : ''}`} onClick={handleSection}>Experience</div>
                    <div className={`px-4 py-2 border cursor-pointer ${currentPage === 'certificates' ? 'active' : ''}`} onClick={handleSection}>Certificates</div>
                </div>
                <div className="w-full h-auto">
                    {
                        components[currentPage]
                    }
                </div>
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-2 items-end overflow-hidden">
                <button onClick={downloadPdf} className="px-4 py-2 bg-blue-500 w-fit rounded font-semibold text-white">Download</button>
                {
                    loading ? (<Loading />) : (
                        <div className="w-full border">
                            {
                                pdfData && <Document file={pdfData} >
                                    <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                                </Document>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard
