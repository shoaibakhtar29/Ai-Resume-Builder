import { StoreContext } from '@/Context/StoreContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const PersonalDetailForm = ({ enableNext }) => {
    const { url, resumeInfo, setResumeInfo, userResumeData } = useContext(StoreContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const handleInputChange = (e) => {
        enableNext(false)
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, formData);
            if (response.data.success) {
                toast.success("Information Saved")
            }
        } catch (error) {
            console.log(error);
            toast.error("Error")
        }
        enableNext(true);
        setLoading(false);
    }
    return (
        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>Personal Detail</h2>
            <p>Get started with the basic information</p>

            <form onSubmit={onSave}>
                <div className=' grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className=''>First Name</label>
                        <Input name="firstName" placeholder="First Name" defaultValue={resumeInfo?.firstName} onChange={handleInputChange} required />
                    </div>

                    <div>
                        <label className=''>Last Name</label>
                        <Input name="lastName" placeholder="First Name" defaultValue={resumeInfo?.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className=' col-span-2'>
                        <label className=''>Job Title</label>
                        <Input name="jobTitle" placeholder="First Name" defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} required />
                    </div>
                    <div className=' col-span-2'>
                        <label className=''>Address</label>
                        <Input name="address" placeholder="First Name" defaultValue={resumeInfo?.address} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className=''>Phone</label>
                        <Input name="phone" placeholder="First Name" defaultValue={resumeInfo?.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className=''>Email</label>
                        <Input name="email" placeholder="First Name" defaultValue={resumeInfo?.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className=''>LinkedIn Profile</label>
                        <Input name="linkedin" placeholder="LinkedIn Profile Url" defaultValue={resumeInfo?.linkedin} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className=''>GitHub Profile</label>
                        <Input name="github" placeholder="GitHub Profile Url" defaultValue={resumeInfo?.github} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className=''>LeetCode Profile Url</label>
                        <Input name="linkedin" placeholder="LeetCode Profile Url" defaultValue={resumeInfo?.leetcode} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className=' mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm
