import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Minus, PlusIcon, Trophy } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CertificationsForm = ({ enableNext }) => {
    const params = useParams()
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [certificationsList, setCertificationsList] = useState([{ title: '' }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.certifications.length > 0 && setCertificationsList(resumeInfo?.certifications)
        console.log(resumeInfo);

    }, [])


    const AddNewCertification = () => {
        setCertificationsList([...certificationsList, { title: '' }])
    }

    const RemoveCertification = () => {
        setCertificationsList(certificationsList => certificationsList.slice(0, -1))
    }

    const handleChange = (index, event) => {
        const newEntries = certificationsList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setCertificationsList(newEntries);
    }

    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { certifications: certificationsList });
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
            certifications: certificationsList
        });
    }, [certificationsList]);

    return (
        <div>
            <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className=' font-bold text-lg'>Certifications</h2>
                <p>Add Your Certifications</p>

                <div>
                    {certificationsList.map((item, index) => (
                        <div key={index} className=' gap-3 border p-3 m-5 rounded-lg'>
                            <div>
                                <label className=' text-xs'>Name</label>
                                <Input defaultValue={item.title} name='title' onChange={(event) => handleChange(index, event)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className=' flex justify-between'>
                    <div className=' flex gap-2'>
                        <Button onClick={() => AddNewCertification()} variant='outline' className=' text-primary'>+ Add More Certifications</Button>
                        <Button onClick={() => RemoveCertification()} variant='outline' className=' text-primary'>- Remove Certifications</Button>
                    </div>
                    <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
                </div>
            </div>
        </div>
    )
}

export default CertificationsForm
