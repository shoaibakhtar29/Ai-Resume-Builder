import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "../components/ui/alert-dialog"
import axios from 'axios'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"
import { StoreContext } from '@/Context/StoreContext'


const ResumeCardItem = ({ resume, setRefreshData }) => {
    const navigation = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const { url } = useContext(StoreContext)
    const { userResumeData } = useContext(StoreContext);

    const onDelete = async () => {
        try {
            setLoading(true);
            const resumeId = resume._id;
            const response = await axios.delete(url + "/api/user/delete-resume/" + resumeId);
            setLoading(false);
            setOpenAlert(false);
            setRefreshData(true);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(() => {
        console.log(resume._id);

    }, [])
    return (
        <div className=''>
            <Link to={'/dashboard/resume/' + resume.resumeId + "/edit"}>
                <div className='p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        '
                    style={{
                        borderColor: resume?.themeColor
                    }}
                >
                    <div className='flex 
        items-center justify-center h-[180px] '>
                        {/* <Notebook/> */}
                        <img src="/cv.png" width={80} height={80} />
                    </div>
                </div>
            </Link>
            <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
                style={{
                    background: "#ff6666"
                }}>
                <h2 className='text-sm'>{resume.title}</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.resumeId + "/edit")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.resumeId + "/view")}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.resumeId + "/view")}>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={openAlert}>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}
                                disabled={loading}>
                                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    )
}

export default ResumeCardItem
