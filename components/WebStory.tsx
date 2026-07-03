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
        <section className="max-w-[1400px] mx-auto p-4 md:p-6 bg-transparent text-gray-900 dark:text-gray-100 transition-colors">
            
            {/* Top Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-2 z-20 transition-colors mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-2xl">Story Editor</h1>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search / Fetch */}
                    <div className="flex items-center gap-2 mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
                        <input
                            className='bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none w-[200px] text-sm shadow-sm transition-colors'
                            ref={articleSearchRef}
                            placeholder="Slug to fetch..."
                        />
                        <button
                            onClick={webstoryFetching}
                            className="px-4 py-1.5 rounded-md shadow-sm text-white text-sm font-medium transition-colors hover:opacity-90 bg-indigo-600"
                        >
                            {fetchingWebstory ? "..." : "Fetch"}
                        </button>
                    </div>

                    <button 
                        onClick={() => preview()} 
                        className='px-5 py-2 rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium transition-colors text-sm'
                    >
                        Preview
                    </button>
                    
                    <button 
                        onClick={() => AiWebStories()} 
                        className='px-5 py-2 rounded-lg shadow-sm bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm flex items-center gap-2'
                    >
                        ✨ {animation ? "..." : "AI Writer"}
                    </button>

                    <button 
                        onClick={() => updateWebStory()} 
                        className='px-5 py-2 rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm'
                    >
                        {processing ? "Updating..." : "Update Story"}
                    </button>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 items-start">
                
                {/* Left Column (Code Editor & Prompts) */}
                <div className="flex flex-col gap-6">
                    
                    {/* Prompt Box */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                        <label className="text-sm font-semibold mb-2 block">AI Prompt / Instructions</label>
                        <textarea 
                            placeholder='Enter your prompts for the AI Web Story generator...' 
                            className='h-[100px] rounded-lg shadow-inner w-full p-4 resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors text-sm' 
                            value={cutomeInstruction} 
                            onChange={(e) => setCutomeInstruction(e.target.value)}
                        />
                    </div>

                    {/* HTML Code Editor */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors min-h-[600px] flex flex-col">
                        <label className="text-sm font-semibold mb-3 px-1 block">Raw HTML Content</label>
                        <div className='flex-1 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 rounded-lg overflow-auto shadow-inner relative'>
                            <Editor
                                value={mandatoryPartCode}
                                onValueChange={code => setMandatoryPartCode(code)}
                                highlight={code => highlight(code, Prism.languages.html, 'html')}
                                padding={16}
                                className='focus:outline-none min-h-full'
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 14, 
                                    whiteSpace: "pre-wrap",
                                }}
                            />
                        </div>
                    </div>

                </div>

                {/* Right Column (Settings Sidebar) */}
                <div className="flex flex-col gap-6 sticky top-[90px]">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">Story Metadata</h3>
                        <FormInput control={control} handleSubmit={handleSubmit} newStories={newStories} newWebStoryCreate={newWebStoryCreate} />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default React.memo(WebStory)

const FormInput = ({ control, newStories, handleSubmit, newWebStoryCreate }: { control: Control<FieldValues, any>, newStories: any, handleSubmit: UseFormHandleSubmit<FieldValues, undefined>, newWebStoryCreate: boolean }) => {
    return (
        <form onSubmit={handleSubmit(newStories)} className='flex flex-col gap-4'>
            
            <Controller
                name='title'
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold">Title</label>
                        <input
                            {...field}
                            placeholder="Story Title..."
                            className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                        />
                    </div>
                )}
            />

            <Controller
                name='slug'
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold">URL Slug</label>
                        <input
                            {...field}
                            placeholder="url-slug"
                            className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm lowercase font-mono transition-colors"
                        />
                    </div>
                )}
            />

            <Controller
                name='poster'
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold">Poster URL</label>
                        <input
                            {...field}
                            placeholder="https://..."
                            className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                        />
                    </div>
                )}
            />

            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold">Description</label>
                        <textarea
                            {...field}
                            placeholder="Brief story description..."
                            className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm min-h-[100px] resize-none transition-colors"
                        />
                    </div>
                )}
            />

            <button 
                type='submit' 
                className='w-full py-2.5 mt-2 rounded-lg shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors text-sm'
            >
                {newWebStoryCreate ? "Creating..." : "Create New Story"}
            </button>

        </form>
    )
}
