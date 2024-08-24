import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { StoreContext } from '@/Context/StoreContext'
import { Brain, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AIchatSession } from '../../AIModel'
import { toast } from 'react-toastify'

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
const SummaryForm = ({ enableNext }) => {
    const params = useParams();
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [summary, setSummary] = useState();
    const [aiSummaryList, setAiSummaryList] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary]);

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            summary: summary
        }

        const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
        console.log(idResponse.data);
        const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, formData);
        if (response.data.success) {
            toast.success("Information Saved")
        }

        enableNext(true);
        setLoading(false);
    }

    const GenerateSummary = async () => {
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIchatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setAiSummaryList(JSON.parse(result.response.text()));
        toast.success("Summary Generated Successfully")
        setLoading(false);
    }
    useEffect(() => { console.log(aiSummaryList); }, [aiSummaryList])
    return (
        <div>
            <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className=' font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>
                <form onSubmit={onSave} className=' mt-7'>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button onClick={() => GenerateSummary()} variant="outline" size="sm" type='button' disabled={loading} className=' border-primary text-primary flex gap-2'> <Brain className=' h-4 w-4' /> Generate from AI</Button>
                    </div>
                    <Textarea onChange={(e) => setSummary(e.target.value)} className=' mt-5' placeholder='Enter Summary or Generate From AI' required />
                    <div className=' mt-2 flex justify-end'>

                        <Button type="submit" disabled={loading}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
                    </div>
                </form>
            </div>
            {aiSummaryList && <div>
                <h2 className=' font-bold text-lg'>AI Generated Summary</h2>
                {aiSummaryList.map((item, index) => (
                    <div key={index}>
                        <h2 className=' font-bold my-1'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default SummaryForm
