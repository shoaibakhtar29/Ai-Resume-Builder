import React from 'react'

const CodingPlatforms = ({ resumeInfo }) => {
    return (
        <div className=' my-3'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo?.themeColor }}>Coding Platforms</h2>
            <hr className='' style={{ borderColor: resumeInfo?.themeColor }} />
            <div className=' gap-3 my-1'>
                {resumeInfo?.codingPlatforms.map((item, index) => (
                    <div key={index} className=' flex fl items-center '>
                        <h2 className=' font-semibold text-sm mr-1'>{item.title} : </h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CodingPlatforms
