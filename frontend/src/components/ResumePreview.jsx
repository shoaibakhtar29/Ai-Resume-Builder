import { StoreContext } from '@/Context/StoreContext'
import React, { useContext } from 'react'
import PersonalDetail from './ResumePreview/PersonalDetail';
import Summary from './ResumePreview/Summary';
import Experience from './ResumePreview/Experience';
import Education from './ResumePreview/Education';
import Skills from './ResumePreview/Skills';
import Projects from './ResumePreview/Projects';
import CourseWork from './ResumePreview/CourseWork';
import CodingPlatforms from './ResumePreview/CodingPlatforms';
import Certifications from './ResumePreview/Certifications';

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo, showExperience } = useContext(StoreContext);
    return (
        <div className="p-2">
            {/* personal detail */}

            <PersonalDetail resumeInfo={resumeInfo} />

            {/* summary */}

            <Summary resumeInfo={resumeInfo} />

            {/* education */}

            <Education resumeInfo={resumeInfo} />

            {/* skills */}

            <Skills resumeInfo={resumeInfo} />

            {/* experience */}

            {showExperience ? <Experience resumeInfo={resumeInfo} /> : null}

            {/* Projects */}

            <Projects resumeInfo={resumeInfo} />

            {/* Course Work / Skills */}

            <CourseWork resumeInfo={resumeInfo} />

            {/* Coding Platforms */}

            <CodingPlatforms resumeInfo={resumeInfo} />

            {/* Certifications */}

            <Certifications resumeInfo={resumeInfo} />
        </div>
    )
}

export default ResumePreview
