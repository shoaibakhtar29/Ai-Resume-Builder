import React from 'react'

const CourseWork = ({ resumeInfo }) => {
    return (
        <div className=' my-1'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo.themeColor }}>CourseWork / Skills</h2>
            <hr className=' ' style={{ borderColor: resumeInfo.themeColor }} />
            <div className=' grid grid-cols-2 gap-3 my-4'>
                {resumeInfo?.course.map((course, index) => (
                    <div key={index} className=' flex items-center justify-between'>
                        <h2 className=' text-sm'>{course.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseWork
