import React from 'react'

const Certifications = ({ resumeInfo }) => {
    return (
        <div className=' my-3'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo.themeColor }}>Certifications</h2>
            <hr className='' style={{ borderColor: resumeInfo.themeColor }} />
            <div className=' gap-3 my-1'>
                {resumeInfo?.certifications.map((item, index) => (
                    <div key={index} className=' flex fl items-center '>
                        <p className='text-sm'>{item.title} </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Certifications
