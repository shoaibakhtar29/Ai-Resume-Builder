import { Loader2, PlusSquare } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';
import { StoreContext } from '@/Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const { url, userResumeData, setUserResumeData, token } = useContext(StoreContext)
    const navigate = useNavigate();

    const getUserResumeInfo = async () => {
        try {
            const response = await axios.get(url + "/api/user/resume-info", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUserResumeData(response.data.userResumeData)
        } catch (error) {
            console.log(error);
        }
    }

    const getUserInfo = async () => {
        try {
            const response = await axios.get(url + "/api/user/user-info", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUserData(response.data.userData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            getUserInfo();
        }
        if (token) {
            getUserResumeInfo();
        }
        console.log(userResumeData);
        console.log(userData);
    }, [token])

    const onCreate = async () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            title: resumeTitle,
            resumeId: uuid,
            userName: userData.name,
            userEmail: userData.email,
            firstName: "Default Name",
            lastName: "Default Name",
            jobTitle: "job title",
            email: "email@gmail.com",
            address: "xyz",
            phone: "1234567890",
            summary: "default summary",
            themeColor: "#ff6666",
            linkedin: "https://linkedin.com/your-id",
            github: "https://github.com/your-id",
            leetcode: "https://leetcode.com/your-id"
        }
        try {
            const response = await axios.post(url + "/api/user/add-resume-data", data)
            if (response.data.success) {
                setLoading(false);
                navigate("/dashboard/resume/" + uuid + "/edit");
                toast.success("Resume Created")
            }
        } catch (error) {
            console.log(error);
            toast.error("Error")
            setLoading(false)
        }
    }
    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className=' p-14 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your resume</p>
                            <Input className=' my-2' placeholder="Ex. Full Stack Developer" onChange={(e) => setResumeTitle(e.target.value)} />
                        </DialogDescription>
                        <div className=' flex justify-end gap-5'>
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button onClick={() => onCreate()} disabled={!resumeTitle || loading} > {loading ? <Loader2 className=' animate-spin' /> : 'Create'}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume
