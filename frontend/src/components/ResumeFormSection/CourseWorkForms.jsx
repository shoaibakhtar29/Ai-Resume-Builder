import { StoreContext } from '@/Context/StoreContext';
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseWorkForms = () => {
    const params = useParams();
    const [courseList, setCourseList] = useState([{
        title: ''
    }]);
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.course.length > 0 && setCourseList(resumeInfo?.course)
        console.log(resumeInfo);

    }, [])

    const AddNewCourse = () => {
        setCourseList([...courseList,
        {
            title: ''
        }
        ])
    }

    const RemoveCourse = () => {
        setCourseList(courseList => courseList.slice(0, -1))
    }

    const handleChange = (index, event) => {
        const newEntries = courseList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setCourseList(newEntries);
    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { course: courseList });
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
            course: courseList
        });
        // console.log(experienceList);

    }, [courseList]);

    useEffect(() => {
        console.log(courseList);
    }, [courseList])

    return (
        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>CourseWork / Skills</h2>
            <p>Add Your CourseWorks / Skills</p>
            <div>
                {courseList.map((item, index) => (
                    <div key={index} className=''>
                        <div className=' my-3'>
                            <label className=''>Course Title</label>
                            <Input defaultValue={item.title} name='title' onChange={(event) => handleChange(index, event)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className=' flex justify-between my-3'>
                <div className=' flex gap-2'>
                    <Button onClick={() => AddNewCourse()} variant='outline' className=' text-primary'>+ Add More Course / Skills</Button>
                    <Button onClick={() => RemoveCourse()} variant='outline' className=' text-primary'>- Remove Course / Skills</Button>
                </div>
                <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default CourseWorkForms
