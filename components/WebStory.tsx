"use client"

import React, { useEffect, useRef, useState } from 'react'
import Editor from 'react-simple-code-editor';
import Prism, { highlight, languages } from 'prismjs';
// import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

import Input from './Input';
import { useForm, Controller, Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import Button from './Button';

function WebStory({ setStories }: { setStories: React.Dispatch<React.SetStateAction<string>> }) {
    const [processing, setProcessing] = React.useState(false);
    const [animation, setAnimation] = React.useState(false);
    const [cutomeInstruction, setCutomeInstruction] = useState("");
    const articleSearchRef = useRef<HTMLInputElement | null>(null);
    const [fetchingWebstory, setFetchingWebstory] = useState(false);

    const [mandatoryPartCode,setMandatoryPartCode] = useState("")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // updating state  holding
    const [updateWebId, setUpdateWebId] = useState("");
    const [updatePostId, setUpdatePostId] = useState("");

    const [previousStory, setPreviousStory] = useState();
    const [storyUpdate, setStoryUpdate] = useState("");
    const [active, setActive] = useState("html");
    const { control, handleSubmit, watch, setValue, getValues } = useForm();

    setValue("slug", watch("title")?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));


    // when you fetched web-story for update
    const webstoryFetching = async () => {
        if (!articleSearchRef.current) {
            return
        }
        const id = articleSearchRef?.current.value;

        if (!id.trim()) {
            console.log("Web Story Fetching:-- Empty please fill that");
            return
        };

        console.log({ id });

        try {
            setFetchingWebstory(true)
            const res = await fetch(`/api/mysql/singleStory?post_name=${id}`);
            const dataJason = await res.json();
            console.log(dataJason);


            if (dataJason.status === 200) {
                const singleWebStory = dataJason?.data[0][0];
                console.log({ singleWebStory });

                setValue("title", singleWebStory?.post_title)
                setValue("slug", singleWebStory?.post_name)
                setValue("description", singleWebStory?.post_excerpt)
                setUpdateWebId(singleWebStory.ID)
                const htmlText: string = singleWebStory?.post_content;
                setMandatoryPartCode(htmlText)

                // web story 
                const singlePostWebStory = dataJason?.data[1][0];
                const content = singlePostWebStory?.post_content;

                // post content extraction
                let matchedDataSingle = content?.match(/<!--\s*wp:web-stories\/embed\s*(\{[\s\S]*?\})\s*-->/);
                const jsonExtractedData = JSON.parse(matchedDataSingle?.[1] ?? '[]');
                console.log({ jsonExtractedData });
                setValue("poster", jsonExtractedData.poster); 
                setUpdatePostId(singlePostWebStory.ID);
            }


        } catch (error) {
            console.log("Error in Mysql connection:- ", error);
        } finally {
            setFetchingWebstory(false)
        }
    }

    // generate webstory with ai writer
    const AiWebStories = async () => {
        try {
            console.log("AI Writer");

            setAnimation(true);

            // controllerRef.current = new AbortController();

            //   setNewContent((prevState) => "");
            const response = await fetch("http://localhost:3000/news/webStoriesGenerator", {
                method: "POST",
                body: JSON.stringify({ userQuery: ` ${cutomeInstruction}` }),
                headers: {
                    "Content-Type": "application/json"
                },
                // signal:controllerRef.current.signal
            });
            const responseJson = await response.json();
            console.log(response);
            let data = responseJson?.data ?? "";
            console.log({ data });

            if (response.status === 200) {
                console.log({ data });
            }

        } catch (error) {
            console.log("Error in Ai writer", error);
        } finally {
            setAnimation(false);
        }
    }


    // updating web-stories
    const updateWebStory = async () => {
        try {
            let { description, slug, title, poster } = getValues();

            const customeData = { description, title, poster, slug, html: mandatoryPartCode, updateWebId, updatePostId };

            console.log({ description, title, poster, slug, html: "", updateWebId, updatePostId });


            setProcessing(true);
            const res = await fetch(`/api/mysql/updateStories`, {
                method: "POST",
                body: JSON.stringify({ updated_content: customeData }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const dataJason = await res.json()
            console.log(dataJason);
        } catch (error) {
            console.log("Error in Mysql connection:- ", error);
        } finally {
            setProcessing(false)
        }
    }

    const preview = () => {
        const data = mandatoryPartCode;
        console.log(data);
        setStories(data)
    }

    const [newWebStoryCreate, setNewWebStoryCreate] = useState(false)
    // when make new web-story
    const newStories = async (data: { description: string, slug: string, title: string, poster: string }) => {
        try {
            setNewWebStoryCreate(true)
            let { description, slug, title, poster } = data;

            const customeData = {
                description, title, poster, slug,
                html: mandatoryPartCode
            };

            console.log({ ...customeData });

            // setProcessing(true)
            const res = await fetch(`/api/mysql/newStories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customeData)
            });

            const dataJason = await res.json();
            console.log(dataJason);

        } catch (error) {
            console.log("Error in Mysql connection:- ", error);
        } finally {
            setNewWebStoryCreate(false)
        }
    }

    return (
        <div className='flex min-h-full'>
            <div className='p-2'>

                <div className="flex justify-between px-1 gap-2 mb-2">
                    <input
                        className='outline outline-2 outline-red-300 p-2 rounded-md'
                        ref={articleSearchRef}
                        placeholder="Search article by slug"
                    />

                    <Button
                        onClick={webstoryFetching}
                        style={{ backgroundImage: 'linear-gradient(45deg, #0c4fd9b3,     #f9f9f9b3)' }}
                        text={fetchingWebstory ? "Fetching" : "Web Story Fetch"}
                    />
                </div>

                {/* form title, desc, slug */}
                <FormInput control={control} handleSubmit={handleSubmit} newStories={newStories} newWebStoryCreate={newWebStoryCreate} />


                <div className='flex justify-around items-center flex-wrap gap-2'>

                    <button onClick={() => updateWebStory()} className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>{processing ? "Updating" : "Update"}</button>

                    <button onClick={() => preview()} className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>Preview</button>

                    <button onClick={() => AiWebStories()} className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>{animation ? "Generating..." : "Ai Writer"}</button>

                </div>


                <textarea placeholder='Enter your prompts...' className='h-[100px] rounded-md shadow-md w-full p-2 resize-none bg-slate-100 ' value={cutomeInstruction} onChange={(e) => setCutomeInstruction(e.target.value)}></textarea>

                <div className='border border-1 border-red-300 m-2 rounded-md max-[426px]:w-full' style={{ maxHeight: "100vh", overflow: "auto", maxWidth: 450 }}>
                    <Editor
                        value={mandatoryPartCode}
                        onValueChange={code => setMandatoryPartCode((prev) => (code))}
                        highlight={code => highlight(code, Prism.languages.html, 'html')}
                        padding={10}
                        className='rounded-md border-none'
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 20, whiteSpace: "pre-wrap"
                        }}
                    />
                </div>

            </div>

        </div>
    )
}

export default React.memo(WebStory)



const FormInput = ({ control, newStories, handleSubmit, newWebStoryCreate }:{control:Control<FieldValues, any>,newStories:any,handleSubmit:UseFormHandleSubmit<FieldValues, undefined>,newWebStoryCreate:boolean}) => {

    return (
        <form onSubmit={handleSubmit(newStories)} className='flex flex-col flex-wrap'>
            <Controller
                name='title'
                control={control}
                render={({ field }) => (
                    <Input lableText='Title' placeholder='Enter Title... ' {...field} />
                )}
            />

            <Controller
                name='poster'
                control={control}
                render={({ field }) => (
                    <Input lableText='Poster' placeholder='Enter Poster... ' {...field} />
                )}
            />

            <Controller
                name='slug'
                control={control}
                render={({ field }) => (
                    <Input lableText='Slug' placeholder='Enter Slug... ' {...field} />
                )}
            />

            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <Input lableText='Description' placeholder='Enter Description... ' {...field} />
                )}
            />

            <button type='submit' className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>{newWebStoryCreate ? "Creating..." : "New Story"}</button>

        </form>
    )

}
