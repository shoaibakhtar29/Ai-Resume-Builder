import { StoreContext } from '@/Context/StoreContext';
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CodingPlatformsForms = () => {
    const params = useParams();
    const [codingPlatformsList, setCodingPlatformsList] = useState([{
        title: '',
        description: ''
    }]);
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.codingPlatforms.length > 0 && setCodingPlatformsList(resumeInfo?.codingPlatforms)
        console.log(resumeInfo);

    }, [])

    const AddNewCoding = () => {
        setCodingPlatformsList([...codingPlatformsList,
        {
            title: '',
            description: ''
        }
        ])
    }

    const RemoveCoding = () => {
        setCodingPlatformsList(codingPlatformsList => codingPlatformsList.slice(0, -1))
    }

    const handleChange = (index, event) => {
        const newEntries = codingPlatformsList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setCodingPlatformsList(newEntries);
    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { codingPlatforms: codingPlatformsList });
            console.log(response.data);

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
            codingPlatforms: codingPlatformsList
        });
        // console.log(experienceList);

    }, [codingPlatformsList]);
    useEffect(() => {
        console.log(codingPlatformsList);
    }, [])

    return (
        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>Coding Platforms</h2>
            <p>Add Your Coding platforms</p>
            <div>
                {codingPlatformsList.map((item, index) => (
                    <div key={index} className=' grid grid-cols-2'>
                        <div className=' m-3'>
                            <label className=''>Coding Platform</label>
                            <Input defaultValue={item.title} name='title' onChange={(event) => handleChange(index, event)} placeholder="LeetCode" />
                        </div>
                        <div className=' m-3'>
                            <label className=''>Description</label>
                            <Input defaultValue={item.description} name='description' onChange={(event) => handleChange(index, event)} placeholder="e.g:- Solved 100+ questions on leetcode..." />
                        </div>
                    </div>
                ))}
            </div>
            <div className=' flex justify-between my-3'>
                <div className=' flex gap-2'>
                    <Button onClick={() => AddNewCoding()} variant='outline' className=' text-primary'>+ Add More Course / Skills</Button>
                    <Button onClick={() => RemoveCoding()} variant='outline' className=' text-primary'>- Remove Course / Skills</Button>
                </div>
                <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default CodingPlatformsForms
