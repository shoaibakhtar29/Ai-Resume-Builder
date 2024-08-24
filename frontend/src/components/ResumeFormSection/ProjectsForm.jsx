import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { StoreContext } from '@/Context/StoreContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input } from '../ui/input'
import ProjectSummary from "../ProjectSummary"
import { Textarea } from '../ui/textarea'

const formField = {
    title: '',
    startDate: '',
    endDate: '',
    projectDetail: '',
    projectSummary: ''
}

const ProjectsForm = () => {
    const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [projectList, setProjectList] = useState([formField])
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        resumeInfo?.project.length > 0 && setProjectList(resumeInfo?.project)
        console.log(resumeInfo);

    }, [])

    const AddNewProject = () => {
        setProjectList([...projectList, formField])
    }

    const RemoveProject = () => {
        setProjectList(projectList => projectList.slice(0, -1))
    }

    const handleChange = (index, event) => {
        const newEntries = projectList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectList(newEntries);
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = projectList.slice();
        newEntries[index][name] = e.target.value;
        setProjectList(newEntries);
    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { project: projectList });
            if (response.data.success) {
                toast.success("Information Saved");
            }

        } catch (error) {
            console.log(error);
            toast.error("Error")
        }

        setLoading(false);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            project: projectList
        });
        // console.log(experienceList);

    }, [projectList]);
    useEffect(() => {
        console.log(projectList);
    }, [])

    return (

        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>Projects</h2>
            <p>Add Your Projects</p>
            <div>
                {projectList.map((item, index) => (
                    <div key={index} className=' grid grid-cols-2 gap-3 border p-3 m-5 rounded-lg'>
                        <div>
                            <label className=''>Project Name</label>
                            <Input defaultValue={item.title} name='title' onChange={(event) => handleChange(index, event)} />
                        </div>

                        <div>
                            <label className=' '>Start Date</label>
                            <Input defaultValue={item.startDate} name='startDate' onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div>
                            <label className=''>End Date</label>
                            <Input defaultValue={item.endDate} name='endDate' onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div>
                            <label className=' col-span-2'>Project Details</label>
                            <Textarea defaultValue={item.projectDetail} name='projectDetail' onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className=' col-span-2'>

                            <ProjectSummary defaultValue={item?.projectSummary} index={index} projectDetail={item.projectDetail} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'projectSummary', index)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className=' flex justify-between'>
                <div className=' flex gap-2'>
                    <Button onClick={() => AddNewProject()} variant='outline' className=' text-primary'>+ Add More Projects</Button>
                    <Button onClick={() => RemoveProject()} variant='outline' className=' text-primary'>- Remove Projects</Button>
                </div>
                <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
            </div>
        </div>

    )
}

export default ProjectsForm
