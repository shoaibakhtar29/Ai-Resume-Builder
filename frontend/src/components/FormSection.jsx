import React, { useContext, useState } from 'react'
import PersonalDetailForm from './ResumeFormSection/PersonalDetailForm'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import SummaryForm from './ResumeFormSection/SummaryForm'
import ExperienceForm from './ResumeFormSection/ExperienceForm'
import EducationForm from './ResumeFormSection/EducationForm'
import SkillsForm from './ResumeFormSection/SkillsForm'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
import ProjectsForm from './ResumeFormSection/ProjectsForm'
import CourseWorkForms from './ResumeFormSection/CourseWorkForms'
import CodingPlatformsForms from './ResumeFormSection/CodingPlatformsForms'
import CertificationsForms from './ResumeFormSection/CertificationsForms'


const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const { resumeId } = useParams();
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className=' flex gap-5'>
                    <Link to={"/dashboard"}><Button><Home /></Button></Link>
                    {/* <ThemeColor /> */}
                </div>
                <div className='flex gap-2'>
                    {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}><ArrowLeft /></Button>}
                    <Button onClick={() => setActiveFormIndex(activeFormIndex + 1)} className='flex gap-2' size="sm" disabled={!enableNext}>Next <ArrowRight /></Button>
                </div>
            </div>


            {activeFormIndex == 1 ? <PersonalDetailForm enableNext={(v) => setEnableNext(v)} /> : null}



            {activeFormIndex == 2 ? <SummaryForm enableNext={(v) => setEnableNext(v)} /> : null}



            {activeFormIndex == 3 ? <EducationForm enableNext={(v) => setEnableNext(v)} /> : null}


            {activeFormIndex == 4 ? <SkillsForm enableNext={(v) => setEnableNext(v)} /> : null}

            {activeFormIndex == 5 ? <ExperienceForm enableNext={(v) => setEnableNext(v)} /> : null}


            {activeFormIndex == 6 ? <ProjectsForm enableNext={(v) => setEnableNext(v)} /> : null}


            {activeFormIndex == 7 ? <CourseWorkForms enableNext={(v) => setEnableNext(v)} /> : null}

            {activeFormIndex == 8 ? <CodingPlatformsForms enableNext={(v) => setEnableNext(v)} /> : null}

            {activeFormIndex == 9 ? <CertificationsForms enableNext={(v) => setEnableNext(v)} /> : null}

            {activeFormIndex == 10 ? <Navigate to={"/my-resume/" + resumeId + "/view"} /> : null}



        </div>
    )
}

export default FormSection
