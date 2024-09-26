import React from 'react'

const Education = ({ resumeInfo }) => {
    return (
        <div className=' my-2'>
            <h2 className=' font-bold mb-1' style={{ color: resumeInfo?.themeColor }}>Education</h2>
            <hr className='' style={{ borderColor: resumeInfo?.themeColor }} />
            {
                resumeInfo?.education.map((education, index) => (
                    <div key={index} className="my-1">
                        <div className=' flex justify-between items-center'>
                            <h2 className=' text-sm font-semibold' style={{ color: resumeInfo?.themeColor }}>{education?.universityName}</h2>
                            <h2 className=' text-sm font-semibold'><span>{education?.eduStartDate} - {education?.eduEndDate}</span></h2>
                        </div>
                        <div className=' flex justify-between'>
                            <h2 className=' flex justify-between text-sm'>{education?.degree} - {education?.branch} </h2>
                            <p className=' ny-1 text-sm'>{education?.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Education
