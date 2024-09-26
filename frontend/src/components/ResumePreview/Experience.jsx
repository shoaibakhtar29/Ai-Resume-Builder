import React from 'react'

const Experience = ({ resumeInfo }) => {
    return (
        <div className=' my-2'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo?.themeColor }} >Experience</h2>
            <hr className=' ' style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.experience.map((experience, index) => (
                <div key={index} className=' my-5'>
                    <h2 className=' text-sm font-bold' style={{ color: resumeInfo?.themeColor }} >{experience?.title}</h2>
                    <h2 className=' flex justify-between text-sm'>{experience?.companyName}, {experience?.city}, {experience?.state} <span>{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span> </h2>
                    {/* <p className=' text-sm my-2'>{experience?.workSummery}</p> */}
                    <div className=' text-sm' dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
                </div>
            ))}
        </div>
    )
}

export default Experience
