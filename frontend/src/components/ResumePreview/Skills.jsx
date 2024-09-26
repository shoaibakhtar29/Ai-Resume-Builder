import { StoreContext } from '@/Context/StoreContext'
import React from 'react'

const Skills = ({ resumeInfo }) => {
    return (
        <div className=' my-1'>
            <h2 className=' font-bold mb-2' style={{ color: resumeInfo?.themeColor }}>Technical Skills</h2>
            <hr className='' style={{ borderColor: resumeInfo?.themeColor }} />
            <div className=' my-1'>
                <div className=' flex gap-1'>
                    <h2 className=' font-semibold text-sm'>Languages :</h2>
                    <p>{resumeInfo?.skills?.languages}</p>
                </div>
                <div className=' flex gap-1'>
                    <h2 className=' font-semibold text-sm'>Developer Tools :</h2>
                    <p>{resumeInfo?.skills?.developerTools}</p>
                </div>
                <div className=' flex gap-1'>
                    <h2 className=' font-semibold text-sm'>Technologies / Frameworks :</h2>
                    <p>{resumeInfo?.skills?.frameworks}</p>
                </div>
            </div>
        </div>
    )
}

export default Skills
