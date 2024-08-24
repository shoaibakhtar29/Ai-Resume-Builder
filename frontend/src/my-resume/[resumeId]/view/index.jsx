import Header from '@/components/custom/Header'
import ResumePreview from '@/components/ResumePreview'
import { Button } from '@/components/ui/button'
import { StoreContext } from '@/Context/StoreContext';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { url } = useContext(StoreContext)
    const params = useParams();

    const getResumeInfo = async (req, res) => {
        try {
            const response = await axios.get(url + "/api/user/view-resume/" + params.resumeId);
            console.log(response.data.resumeData[0]);
            setResumeInfo(response.data.resumeData[0])
        } catch (error) {
            console.log(error);

        }
    }

    const handleDownload = () => {
        const resumeElement = document.getElementById('resumePreview'); // The div containing the resume preview
        const width = resumeElement.offsetWidth;
        const height = resumeElement.offsetHeight;

        html2canvas(resumeElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Convert px dimensions to mm for jsPDF
            const pdfWidth = width * 0.264583; // Convert px to mm
            const pdfHeight = height * 0.264583; // Convert px to mm

            const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
            toast.success("Resume Downloaded Successfully");
        })
    }

    useEffect(() => { getResumeInfo() }, [])
    return (
        <StoreContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className=' my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className=' text-center text-2xl font-medium'>Congrats! Your Ultimate AI generate Resume is Ready</h2>
                <p className=' text-center text-gray-400'>Now you are ready to download your resume and you can share your resume!</p>
                <div className=' flex justify-center px-44 my-10'>
                    <Button size='lg' onClick={handleDownload}>Download</Button>

                </div>
                <div id='resumePreview' className=' p-2 bg-white m-3'>
                    <ResumePreview />
                </div>
            </div>
        </StoreContext.Provider>
    )
}

export default ViewResume
