import FormSection from '@/components/FormSection';
import ResumePreview from '@/components/ResumePreview';
import { StoreContext } from '@/Context/StoreContext';
import dummy from '@/data/dummy';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditResume = () => {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(StoreContext);
    const { url } = useContext(StoreContext);

    const getResumeInfo = async () => {
        try {
            const response = await axios.get(url + "/api/user/view-resume/" + params.resumeId);
            setResumeInfo(response.data.resumeData[0])
            console.log(response.data.resumeData[0]);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getResumeInfo();
        console.log(resumeInfo);


    }, [])
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            <FormSection />

            <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-20'>
                <h2 className=' text-center font-bold text-xl'>Resume Preview</h2>
                <hr className=' border-1.5 border-black mb-3' />
                <ResumePreview />
            </div>
        </div>
    )
}

export default EditResume
