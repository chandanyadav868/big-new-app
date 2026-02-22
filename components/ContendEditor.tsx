import React, { useEffect, useRef, useState } from "react";
import EditInput from "./Input";
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import { PropsContentEdit } from "../app/(main)/edit/[content]/page";
import AiButton from "./AiButton";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { SYSTEM_PROMPTS, TITLE_SLUG_DESCRIPTION_PROMPTS } from "../lib/constants";
import Groq from "groq-sdk";
import Image from "next/image";
import { BadgeCheck, CircleX } from "lucide-react";
import WebStory from "./WebStory";
import PreviewStory from "./PreviewStory";


interface DataPropsSubmission {
    blogImageUrl: string;
    category: string;
    content: string;
    createdby: string;
    featuredImagealt: string;
    slug: string;
    title: string;
    description: string;
    visibility: boolean;
}

const ContentEditor = ({ blogImageUrl, category, slug, content, title, description, featuredImagealt, _id }: PropsContentEdit) => {
    const { control, handleSubmit, watch, setValue, getValues } = useForm<DataPropsSubmission>();
    const [newContent, setNewContent] = useState<string>(content ?? "");
    const [animation, setAnimation] = useState(false);
    const [slugAnimation, setslugAnimation] = useState(false);
    const [submission, setSubmission] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | undefined>(blogImageUrl);

    interface SlugPropsTitles {
        slug: string;
        title: string;
        description: string;
    }
    const [slugTitledes, setslugTitledes] = useState<SlugPropsTitles>({
        slug: slug ?? "",
        title: title ?? "",
        description: description ?? "",
    });

    const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

    const reset = () => {
        setNewContent(content ?? "");
    };

    const createdBy = {
        wwe: "Alice",
        cricket: "Bob",
        basketball: "Charlie",
        football: "David",
        others: "Eve",
    };
    const categoryValue = watch("category");
    useEffect(() => {
        if (categoryValue === "wwe") {
            setValue("createdby", createdBy.wwe);
        } else if (categoryValue === "cricket") {
            setValue("createdby", createdBy.cricket);
        } else if (categoryValue === "basketball") {
            setValue("createdby", createdBy.basketball);
        } else if (categoryValue === "football") {
            setValue("createdby", createdBy.football);
        } else {
            setValue("createdby", createdBy.others);
        }
    }, [categoryValue]);

    const imageUrl = watch("blogImageUrl");
    useEffect(() => {
        setImagePreview(imageUrl);
    }, [imageUrl]);

    const TitleDesSlugReWrite = async () => {
        try {
            const articleContent = watch("content");
            setslugAnimation(true);

            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: TITLE_SLUG_DESCRIPTION_PROMPTS
                    },
                    {
                        role: 'user',
                        content: articleContent,
                    },
                ],
                model: 'openai/gpt-oss-120b',
                response_format: {
                    type: 'json_object'
                }
            });

            console.log({ response });

            const content = response.choices[0].message.content;
            const parseValue = JSON.parse(content ?? "{}");
            setslugTitledes(parseValue);

        } catch (error) {
            console.log('Error in title and slug and description writing', error);
        } finally {
            setslugAnimation(false);
        }
    };

    useEffect(() => {
        setValue("slug", slugTitledes.slug)
        setValue("title", slugTitledes.title);
        setValue("description", slugTitledes.description);
    }, [slugTitledes]);

    // ai writer for content
    const aiWriter = async () => {
        try {
            const markdownValue = watch("content");
            setAnimation(true);

            const stream = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPTS,
                    },
                    {
                        role: 'user',
                        content: markdownValue,
                    },
                ],
                model: 'openai/gpt-oss-120b',
                max_tokens: 2000,
                stream: true,
            })

            // this replace older data present in editor
            setNewContent("")

            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content;
                    if (newContent === undefined) continue
                    setNewContent((prevState) => prevState + newContent);
                }
            }

        } catch (error) {
            console.log("err in fetching aiwriter ", error);
        } finally {
            setAnimation(false);
        }
    };

    const submissionData = async (data: DataPropsSubmission) => {
        try {
            setSubmission(true);
            const ArticleRefinedData = { _id, ...data, slug: slug };

            console.log({ ArticleRefinedData });

            const response = await fetch("/api/editArticle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ArticleRefinedData),
            });
            const responseJson = await response.json();

            if (response.status === 200) {
                console.log(responseJson);
                return
            }
            throw new Error(JSON.stringify(responseJson))
        } catch (error) {
            console.log("Error in Saving", error);
        } finally {
            setSubmission(false);
        }
    };

    const [newArticleCreating, setNewArticleCreating] = useState(false);
    const [success, setSuccess] = useState({
        error: false,
        success: false
    });

    const newArticle = async () => {
        try {
            setNewArticleCreating(true);
            const allValues = getValues();
            console.log({ allValues });

            const ArticleRefinedData = { ...allValues };
            console.log({ ArticleRefinedData });

            const response = await fetch("/api/newArticle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ArticleRefinedData),
            });
            const responseJson = await response.json();

            if (response.status === 200) {
                console.log(responseJson);
                setSuccess((prev) => ({ error: false, success: true }))
                return
            }
            throw new Error(JSON.stringify(responseJson))
        } catch (error) {
            setSuccess((prev) => ({ error: true, success: false }))
            console.log("Error in Saving", error);
        } finally {
            setNewArticleCreating(false);
        }
    }

    const [stories, setStories] = useState("");
    const [storyShow, setStoriesShow] = useState(false);

    return (
        <>
            <div className="flex gap-2 flex-wrap">
                <input className="w-4 cursor-pointer" type="checkbox" value={String(storyShow)} onClick={() => setStoriesShow(prev => !prev)} />
                <span className="font-bold">Story Active</span>
            </div>

            {storyShow && <WebStory setStories={setStories} />}
            {storyShow && <PreviewStory  stories={stories} />}

            {!storyShow && <section>
                <div className="w-[80%] mx-auto flex gap-4 flex-col outline outline-1 rounded-md p-2 mt-2">
                    <h1 className="font-bold text-2xl text-center ">Article </h1>

                    <div className="flex justify-end gap-4">
                        {success.success && <BadgeCheck size={32} fill="green" color="white" />}
                        {success.error && <CircleX size={32} fill="red" color="white" />}
                    </div>

                    <div>
                        <button onClick={TitleDesSlugReWrite}>
                            {slugAnimation ? "Generating" : "AI Generate"}
                        </button>
                    </div>

                    <form
                        className="flex gap-4 flex-col rounded-md p-2 mt-2"
                        onSubmit={handleSubmit(submissionData)}
                    >
                        {/* slug */}
                        <Controller
                            name="slug"
                            control={control}
                            defaultValue={slug || ""}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Slug"
                                    inputname="slug"
                                    placeholder="Enter Your Slug..."
                                    className="lowercase"
                                />
                            )}
                        />
                        {/* title */}
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={title || ""}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Title"
                                    inputname="title"
                                    placeholder="Enter Your Title..."
                                    className=""
                                />
                            )}
                        />
                        {/* description */}
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={description ?? ""}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex flex-wrap gap-4 items-center justify-center">
                                    <label className="font-bold w-[20%]" htmlFor="description">Description</label>
                                    <textarea {...field} className="outline-none focus:ring-1 shadow-inner px-7 py-3 rounded-md bg-slate-100 flex-1 min-h-28 resize-none">
                                    </textarea>
                                </div>

                            )}
                        />
                        {/* imageUrl */}
                        <Controller
                            name="blogImageUrl"
                            control={control}
                            defaultValue={blogImageUrl}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Feature Image"
                                    inputname="slblogImageUrlug"
                                    placeholder="Enter Your Featured Image..."
                                    className=""
                                />
                            )}
                        />
                        {/* image preview */}
                        <div className="w-[200px] h-[100px] mx-auto">
                            {imagePreview && <Image
                                src={imagePreview}
                                height={1000}
                                width={1000}
                                alt="Preview"
                                className="w-full h-full rounded-md shadow-md border border-red-100 object-cover"
                                style={{ aspectRatio: "16/9" }}
                                loading="lazy"
                                decoding="async"
                            />}
                        </div>
                        {/* alt featured Image */}
                        <Controller
                            name="featuredImagealt"
                            control={control}
                            defaultValue={featuredImagealt}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Image Alt"
                                    inputname="featuredImagealt"
                                    placeholder="Enter Your Featured Image Alt..."
                                    className=""
                                />
                            )}
                        />

                        {/* category */}
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={category}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Category"
                                    inputname="category"
                                    placeholder="Enter Your Category for article..."
                                    className=""
                                />
                            )}
                        />

                        {/* editor */}
                        <Controller
                            name="createdby"
                            control={control}
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field }) => (
                                <EditInput
                                    {...field}
                                    lableText="Createdby"
                                    inputname="createdby"
                                    placeholder="Enter Your Createdby for article..."
                                    className=""
                                />
                            )}
                        />

                        {/* public */}
                        <Controller
                            name="visibility"
                            control={control}
                            defaultValue={true}
                            render={({ field }) => (
                                <div className="flex items-center flex-wrap">
                                    <label className="flex font-bold text-xl w-[15%] shrink-0">
                                        Visibility
                                    </label>
                                    <select
                                        {...field}
                                        className="shadow-md px-7 py-3 text-xl font-bold flex-1"
                                        value={String(field.value)}
                                    >
                                        <option value="#">Choose Visibility</option>
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </select>
                                </div>
                            )}
                        />

                        {/* content */}
                        <div className="flex justify-between items-center">
                            <span
                                className="bg-blue-400 w-fit px-3 py-1 rounded-md font-bold text-xl hover:cursor-pointer"
                                onClick={() => reset()}
                            >
                                Reset
                            </span>

                            <AiButton onClick={aiWriter} animation={animation} />
                        </div>

                        <Controller
                            name="content"
                            control={control}
                            defaultValue={content}
                            render={({ field }) => (
                                <MDEditor
                                    data-color-mode="light"
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        minHeight: "444px",
                                    }}
                                    {...field}
                                    value={newContent}
                                    onChange={(value) => {
                                        setNewContent(value || "");
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                        <div className="flex gap-2 flex-wrap justify-center">
                            <span
                                onClick={() => newArticle()}
                                className="bg-blue-400 px-7 py-3 rounded-md shadow-md font-bold text-xl hover:bg-blue-600 cursor-pointer"
                            >{newArticleCreating ? "Creating..." : "New Create"}</span>
                            <Button
                                submission={submission}
                                type="submit"
                                text={"Update"}
                                className="bg-blue-400 px-7 py-3 rounded-md shadow-md font-bold text-xl hover:bg-blue-600"
                            />
                        </div>
                    </form>
                </div>
            </section>
            }
        </>
    );
};

export default ContentEditor;
