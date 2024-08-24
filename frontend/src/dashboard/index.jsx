import AddResume from '@/components/AddResume'
import ResumeCardItem from '@/components/ResumeCardItem'
import { StoreContext } from '@/Context/StoreContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const Dashboard = () => {
    const { userResumeData } = useContext(StoreContext);
    const [refreshData, setRefreshData] = useState(false);
    if (refreshData) {
        window.location.reload();
        setRefreshData(false);
    }
    return (
        <div className=' p-10 md:px-10 lg:px-32'>
            <h2 className=' font-bold text-3xl'>My Resume</h2>
            <p>Start Creating Resume For Your Next Job Role</p>
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
                <AddResume />
                {
                    userResumeData.length > 0 && userResumeData.map((resume, index) => (
                        <ResumeCardItem resume={resume} key={index} setRefreshData={setRefreshData} />
                    ))
                }
            </div>

        </div>
    )
}

export default Dashboard
