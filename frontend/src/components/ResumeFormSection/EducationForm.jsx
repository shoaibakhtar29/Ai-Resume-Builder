import { StoreContext } from '@/Context/StoreContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EducationForm = ({ enableNext }) => {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [newEntries, setNewEntries] = useState();
    const [educationalList, setEducationalList] = useState([
        {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: ""
        }
    ]);

    useEffect(() => {
        resumeInfo && setEducationalList(resumeInfo?.education)
    }, [])

    const handleChange = (event, index) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList,
        {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: ""
        }
        ])
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { education: educationalList });
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
            education: educationalList
        });
        console.log(educationalList);

    }, [educationalList])
    return (

        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>Education</h2>
            <p>Add Your Educational Details</p>

            <div>
                {
                    educationalList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 m-5 rounded-lg'>
                                <div className='col-span-2'>
                                    <label>University Name</label>
                                    <Input name="universityName"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.universityName}
                                    />
                                </div>
                                <div>
                                    <label>Degree</label>
                                    <Input name="degree"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.degree} />
                                </div>
                                <div>
                                    <label>Branch</label>
                                    <Input name="branch"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.major} />
                                </div>
                                <div>
                                    <label>Start Date</label>
                                    <Input name="eduStartDate"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label>End Date</label>
                                    <Input name="eduEndDate"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.endDate} />
                                </div>
                                <div className='col-span-2'>
                                    <label>City</label>
                                    <Input name="description"
                                        onChange={(e) => handleChange(e, index)}
                                        defaultValue={item?.description} />
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className=' flex justify-between'>
                <div className=' flex gap-2'>
                    <Button onClick={AddNewEducation} variant='outline' className=' text-primary'>+ Add More Education</Button>
                    <Button onClick={RemoveEducation} variant='outline' className=' text-primary'>- Remove Education</Button>
                </div>
                <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default EducationForm
