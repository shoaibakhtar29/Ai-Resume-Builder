import { StoreContext } from '@/Context/StoreContext'
import React, { useContext } from 'react'

const Projects = () => {
    const { resumeInfo } = useContext(StoreContext);
    return (
        <div className=' my-2'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo?.themeColor }} >Project</h2>
            <hr className='' style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.project.map((project, index) => (
                <div key={index} className=' my-1'>
                    <div className='flex justify-between items-center'>
                        <h2 className=' font-bold underline' style={{ color: resumeInfo?.themeColor }}>{project?.title}</h2>
                        <h2 className=' text-sm flex justify-between'> <span>{project?.startDate} - {project?.endDate}</span> </h2>
                    </div>
                    <div className=' text-sm' dangerouslySetInnerHTML={{ __html: project?.projectSummary }} />
                </div>
            ))}
        </div>
    )
}

export default Projects
