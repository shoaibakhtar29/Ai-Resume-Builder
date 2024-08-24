import React from 'react'

const Summary = ({ resumeInfo }) => {
    return (
        <p className='text-sm'>
            {resumeInfo?.summary}
        </p>
    )
}

export default Summary
