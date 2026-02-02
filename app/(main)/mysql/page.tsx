"use client"

import React, { useEffect, useRef, useState } from 'react'
import Editor from 'react-simple-code-editor';
import Prism, { highlight, languages } from 'prismjs';
// import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import PreviewStory from "@/components/Preview"
import { mandatoryHtml } from '@/lib/utils';
import Input from '@/components/Input';
import { useForm, Controller, Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import PreviousStoryCard from '@/components/PreviousStoryCard';
import { webStoriesProps } from '../web-stories/page';

interface formStateProps {
    title: string
    slug: string
    description: string
    poster: string
}

function page() {
    const [processing, setProcessing] = React.useState(false);

    const [stories, setStories] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [slug, setSlug] = useState<string>("");

    const [previousStory, setPreviousStory] = useState<webStoriesProps[] | undefined>();
    const [storyUpdate, setStoryUpdate] = useState("");
    const [mandatoryPartCode, setMandatoryPartCode] = useState<{ html: string; body: string }>({ body: "", html: mandatoryHtml });
    const [active, setActive] = useState<"html" | "body">("html");
    const { control, handleSubmit, watch, setValue } = useForm<formStateProps>();

    setValue("slug", watch("title")?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    // post_content starting with <!-- wp:web-stories/embed this is story

    useEffect(() => {
        const response = async () => {
            try {
                const res = await fetch(`/api/mysql`);
                const dataJason = await res.json();

                console.log(dataJason);

                const dataPost = dataJason.data?.filter((v: { post_content: string }, i: number) => v.post_content.startsWith("<!-- wp:web-stories/embed "));

                console.log(dataPost)

                const matchedData: webStoriesProps[] | undefined = dataPost?.map((v: { post_content: string }, i: number) => {
                    let matchedDataSingle = v?.post_content?.match(/<!--\s*wp:web-stories\/embed\s*(\{[\s\S]*?\})\s*-->/);

                    const jsonExtractedData = JSON.parse(matchedDataSingle?.[1] ?? '[]');
                    console.log({ jsonExtractedData });
                    return jsonExtractedData as webStoriesProps
                })

                console.log({ matchedData });
                setPreviousStory(matchedData)

            } catch (error) {
                console.log("Error in Mysql connection:- ", error);
            }
        }
        response()
    }, []);

    const [id, setID] = useState<number | undefined>()

    const webstoryFetching = async (id: number) => {
        console.log({ id });

        try {
            const res = await fetch(`/api/mysql?id=${id}`);
            const dataJason = await res.json();

            const singleWebStory = dataJason.data[0];
            console.log({ singleWebStory });

            setValue("title", singleWebStory.post_title)
            setValue("slug",singleWebStory.post_name)
            setValue("description",singleWebStory.post_excerpt)

            const htmlText = singleWebStory?.post_content as string;
            setStories(htmlText)
            const html = htmlText.match(/<html[\s\S]*?<\/head>/gi);
            const body = htmlText.match(/<body[\s\S]*?<\/body>/gi);
            const doc = { html: html?.[0] + "{body}" + "</html>", body: body?.[0] ?? "" }

            // console.log(doc.html.replace("{body}",doc.body))

            setMandatoryPartCode(doc)
            // console.log(body?.[0]);

            setStoryUpdate(htmlText ?? "")
            // console.log(dataJason);
        } catch (error) {
            console.log("Error in Mysql connection:- ", error);
        }
    }

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            await webstoryFetching(id);
        };
        fetchData();
    }, [id]);



    const updateWebStory = async () => {
        try {
            setProcessing(true)
            const res = await fetch(`/api/mysql`, {
                method: "POST",
                body: JSON.stringify({ updated_content: storyUpdate })
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
        const data = mandatoryPartCode.html.replace("{body}", mandatoryPartCode.body);
        console.log(data);
        setStories(data)
    }

    const newStories = async (data: formStateProps) => {
        try {
            let { description, slug, title, poster } = data;

            const customeData = {
                description, title, poster, slug,
                html: mandatoryPartCode.html.replace("{body}", mandatoryPartCode.body)
            };

            console.log(customeData);

            setProcessing(true)
            const res = await fetch(`/api/mysql/newStories`, {
                method: "POST",
                body: JSON.stringify(customeData)
            });

            const dataJason = await res.json();
            console.log(dataJason);

        } catch (error) {
            console.log("Error in Mysql connection:- ", error);
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className='flex flex-row-reverse min-h-full'>

            <PreviewStory stories={stories} />

            <div className='p-2'>

                {/* showing preview of card */}
                <div className='flex gap-4 rounded-md flex-row mb-2 overflow-auto'>
                    {
                        previousStory?.map((v, i) => (
                            <PreviousStoryCard key={i} fetchingFun={setID} data={v} />
                        ))
                    }
                </div>

                {/* form title, desc, slug */}
               <FormInput control={control} handleSubmit={handleSubmit} newStories={newStories} />


                <div className='flex justify-around items-center flex-wrap gap-2'>
                    <div className='flex gap-2 px-2 py-4 flex-1'>
                        {["html", "body"].map((v, i) => (
                            <span key={i} onClick={() => setActive(v as "html" | "body")} className='py-2 px-4 rounded-md bg-red-300 font-normal cursor-pointer'>{v}</span>
                        ))}
                    </div>

                    <button onClick={() => updateWebStory()} className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>{processing ? "Updating" : "Update"}</button>

                    <button onClick={() => preview()} className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>Preview</button>

                </div>


                <div className='border border-1 border-red-300 m-2 rounded-md' style={{ maxHeight: "100vh", overflow: "auto", maxWidth: 720 }}>
                    <Editor
                        value={mandatoryPartCode[active]}
                        onValueChange={code => setMandatoryPartCode((prev) => ({ ...prev, [active]: code }))}
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

export default page



const FormInput = ({control,newStories,handleSubmit}:{control:Control<formStateProps, any>,newStories: (data: formStateProps) => Promise<void>,handleSubmit: UseFormHandleSubmit<formStateProps, undefined>})=>{

    return(
         <form onSubmit={handleSubmit(newStories)} className='flex flex-col gap-2'>

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

                    <button type='submit' className='px-4 py-2 rounded-md shadow-md w-fit bg-green-400 mx-auto m-4'>New Story</button>

                </form>
    )

}
