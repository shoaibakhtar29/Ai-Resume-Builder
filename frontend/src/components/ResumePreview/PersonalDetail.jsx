import { Github, Linkedin, LinkedinIcon, Mail, Phone, PhoneIcon } from 'lucide-react'
import React, { useEffect } from 'react'

const PersonalDetail = ({ resumeInfo }) => {
    useEffect(() => {
        console.log(resumeInfo)
    }, [resumeInfo])
    return (
        <div>
            <h2 className=' font-bold text-xl text-center' >{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
            <h2 className=' text-center font-normal mb-1'>{resumeInfo?.address}</h2>
            {/* <h2 className=' text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2> */}
            <div className=' flex justify-around'>
                <h2 className=' flex items-center gap-1 font-semibold text-xs underline'><Mail width="12" /><p>{resumeInfo?.email}</p></h2>
                <h2 className=' flex items-center gap-1 font-semibold text-xs underline'><PhoneIcon size="12" /><p>+91-{resumeInfo?.phone}</p></h2>
                <h2 className=' flex items-center gap-1 font-semibold text-xs underline'><LinkedinIcon size="13" /><a href={resumeInfo?.linkedin}>LinkedIn</a></h2>
                <h2 className=' flex items-center gap-1 font-semibold text-xs underline'><Github size="13" /><a href={resumeInfo?.github}>GitHub</a></h2>
                <h2 className=' flex items-center gap-1 font-semibold text-xs underline'><img src="/leetcodeicon.png" width="13" /><a href={resumeInfo?.leetcode}>LeetCode</a></h2>
            </div>
            <hr className=' my-2 border-black' />
        </div>
    )
}

export default PersonalDetail
