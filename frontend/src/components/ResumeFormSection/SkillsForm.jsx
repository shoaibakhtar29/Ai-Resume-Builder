import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { StoreContext } from '@/Context/StoreContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const SkillsForm = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo, url } = useContext(StoreContext);
    const [skillsList, setSkillsList] = useState();

    useEffect(() => {
        resumeInfo && setSkillsList(resumeInfo?.skills)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSkillsList({
            ...skillsList,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }


    const onSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const idResponse = await axios.post(url + "/api/user/get-resume-id", { resumeId: params.resumeId })
            console.log(idResponse.data._id);
            const response = await axios.patch(url + "/api/user/update-resume/" + idResponse.data._id, { skills: skillsList });
            if (response.data.success) {
                toast.success("Information Saved")
            }
        } catch (error) {
            console.log(error);
            toast.error("Error")
        }
        setLoading(false)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

    return (
        <div className=' p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className=' font-bold text-lg'>Technical Skills</h2>
            <p>Add Your Technical Skills</p>
            <div className=' border rounded-lg p-3 mb-3'>
                <div>
                    <label>Languages</label>
                    <Input defaultValue="" name="languages" className=' w-full' placeholder="c, c++..." onChange={handleChange} />
                </div>
                <div>
                    <label>Developer Tools</label>
                    <Input defaultValue="" name="developerTools" className=' w-full' placeholder="VS Code, Intellije Idea..." onChange={handleChange} />
                </div>
                <div>
                    <label>Technologies/Frameworks</label>
                    <Input defaultValue="" name="frameworks" className=' w-full' placeholder="React, Springboot..." onChange={handleChange} />
                </div>
                {/* <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(event) => handleChange(index, event)} /> */}
            </div>
            <div className=' flex justify-between'>

                <Button onClick={onSave}>{loading ? <Loader2 className=' animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default SkillsForm
