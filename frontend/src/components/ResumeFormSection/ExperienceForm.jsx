import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Minus, PlusIcon, Trophy } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}


const ExperienceForm = ({ enableNext }) => {
    const params = useParams()
    const { resumeInfo, setResumeInfo, url, showExperience, setShowExperience } = useContext(StoreContext);
    const [experienceList, setExperienceList] = useState([formField]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.experience.length > 0 && setExperienceList(resumeInfo?.experience)
        console.log(resumeInfo);

    }, [])


    const AddNewExperince = () => {
        setExperienceList([...experienceList, formField])
    }

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    const handleCheckBox = () => {
        setShowExperience(prevState => !prevState);

    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { experience: experienceList });
            if (response.data.success) {
                toast.success("Information Saved");
            }

        } catch (error) {
            console.log(error);
            toast.error("Error")
        }

        enableNext(true);
        setLoading(false);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        });
        // console.log(experienceList);
        console.log(showExperience);


    }, [experienceList]);

    return (
        <div>
            <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className=' font-bold text-lg'>Experience</h2>
                <p>Add Your Experiences</p>
                <div className=' flex items-center gap-1'><Input type="checkbox" className=" w-4 h-4" onChange={handleCheckBox} /><p>Click Here if you don't have experience.</p></div>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index} className=' grid grid-cols-2 gap-3 border p-3 m-5 rounded-lg'>
                            <div>
                                <label className=' text-xs'>Position</label>
                                <Input defaultValue={item.title} name='title' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className=' text-xs'>Company Name</label>
                                <Input defaultValue={item.companyName} name='companyName' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className=' text-xs'>City</label>
                                <Input defaultValue={item.city} name='city' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className=' text-xs'>State</label>
                                <Input defaultValue={item.state} name='state' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className=' text-xs'>Start Date</label>
                                <Input defaultValue={item.startDate} name='startDate' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label className=' text-xs'>End Date</label>
                                <Input defaultValue={item.endDate} name='endDate' onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div className=' col-span-2'>
                                {/* work summary */}
                                <RichTextEditor defaultValue={item?.workSummary} index={index} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className=' flex justify-between'>
                    <div className=' flex gap-2'>
                        <Button onClick={() => AddNewExperince()} variant='outline' className=' text-primary'>+ Add More Experience</Button>
                        <Button onClick={() => RemoveExperience()} variant='outline' className=' text-primary'>- Remove Experience</Button>
                    </div>
                    <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
                </div>
            </div>
        </div>
    )
}

export default ExperienceForm
