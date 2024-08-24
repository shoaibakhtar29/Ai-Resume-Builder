import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from './ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { StoreContext } from '@/Context/StoreContext';
import { AIchatSession } from '@/AIModel';
import { toast } from 'react-toastify';

const PROMPT = 'Project Details:- {projectDetail} . I want to add project in my resume. So depends on project details give me 4-5 bullet points which are easily understandle and readable. give me result in HTML tags. please do not include json array or json only give in html tag format.'

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const GenerateSummary = async () => {
        setLoading(true);
        if (!resumeInfo.project[index].projectDetail) {
            toast.error("Please Enter Project Details")
            return;
        }
        const prompt = PROMPT.replace('{projectDetail}', resumeInfo.project[index].projectDetail);
        const result = await AIchatSession.sendMessage(prompt);
        console.log(prompt);
        console.log(result.response.text());
        const resp = result.response.text();
        setValue(resp.replace('[', '').replace(']', ''));
        toast.success("Summary Generated")
        console.log(resp);
        setLoading(false);
    }

    return (
        <div>
            <div className=' flex justify-between my-2'>
                <h2 className=' font-bold text-lg'>Project Summary</h2>
                <Button onClick={GenerateSummary} variant="outline" size='sm' className=' flex gap-2 border-primary text-primary'>{loading ? <LoaderCircle className=' animate-spin' /> : <><Brain /> Generate From AI</>}</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
