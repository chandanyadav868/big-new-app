import React, { useEffect, useRef, useState } from "react";
import EditInput from "./Input";
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import { PropsContentEdit } from "../app/(main)/edit/[content]/page";
import AiButton from "./AiButton";
// import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from '@uiw/react-markdown-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import { SYSTEM_PROMPTS, TITLE_SLUG_DESCRIPTION_PROMPTS } from "../lib/constants";
import Groq from "groq-sdk";
import Image from "next/image";
import { BadgeCheck, CircleX, Eye, EyeOff } from "lucide-react";
import WebStory from "./WebStory";
import PreviewStory from "./PreviewStory";
import { error } from "console";
import { Commands } from "@uiw/react-markdown-editor/cjs/components/ToolBar";


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
    const { control, handleSubmit, watch, setValue, getValues } = useForm<DataPropsSubmission>({
        defaultValues: {
            blogImageUrl,
            category,
            slug,
            content,
            title,
            description,
            featuredImagealt
        }
    });
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
            // console.log({ markdownValue });


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
                    // console.log({ newContent });

                    if (newContent === undefined) continue
                    setNewContent((prev) => {
                        const updated = prev + newContent;
                        return updated;
                    });
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

    const [preview, setPreview] = useState(false)
    const title2 = {
        name: 'title2',
        keyCommand: 'title2',
        button: { 'aria-label': 'Add title text' },
        icon: (
            <> {preview ? <Eye /> : <EyeOff />} </>
        ),
        execute: () => {
            setPreview((prev) => !prev)
        },
    };

    return (
        <>
            <label className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm mb-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all max-w-[1400px] mx-auto mt-4">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 dark:text-white text-lg">Web Story Editor</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Toggle this switch to open the visual Web Story Builder instead of the standard Article Editor.</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={storyShow}
                        onChange={() => setStoriesShow(prev => !prev)} 
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </div>
            </label>

            {storyShow && <WebStory setStories={setStories} />}
            {storyShow && <PreviewStory stories={stories} />}

            {!storyShow && <section className="max-w-[1400px] mx-auto p-4 md:p-6 mt-4">
                <form
                    onSubmit={handleSubmit(submissionData)}
                    className="flex flex-col gap-6 text-gray-900 dark:text-gray-100"
                >
                    {/* Top Action Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-2 z-20 transition-colors">
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-2xl">Article Editor</h1>
                            {success.success && <BadgeCheck size={28} fill="green" color="white" />}
                            {success.error && <CircleX size={28} fill="red" color="white" />}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-lg font-medium transition-colors text-sm"
                                onClick={() => reset()}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={TitleDesSlugReWrite}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center min-w-[140px]"
                            >
                                {slugAnimation ? "Generating SEO..." : "✨ AI Meta SEO"}
                            </button>
                            <AiButton onClick={aiWriter} animation={animation} />

                            <button
                                type="button"
                                onClick={() => newArticle()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm font-medium transition-colors text-sm"
                            >
                                {newArticleCreating ? "Creating..." : "Create New"}
                            </button>

                            <Button
                                submission={submission}
                                type="submit"
                                text={"Update Article"}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow-sm font-medium transition-colors text-sm"
                            />
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 items-start">

                        {/* Main Editor Column (Left) */}
                        <div className="flex flex-col gap-6">

                            {/* Markdown Editor */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors max-w-[700px] mx-auto min-h-[700px]">
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{ required: "Please write contents", }}
                                    render={({ field, fieldState: { error } }) => (
                                        <div className="h-full flex flex-col">
                                            {error && <span className="font-bold text-red-500 mb-2 block">{error.message}</span>}
                                            <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                                <MarkdownEditor
                                                    className="w-full h-full"
                                                    height="700px"
                                                    theme={"dark"}
                                                    width="100%"
                                                    enablePreview={false}
                                                    toolbars={[
                                                        "undo", "redo", "bold", "italic", "header", "strike", "underline", "quote", "olist", "ulist", "todo", "link", "image", "code", "codeBlock", title2
                                                    ]}
                                                    value={newContent}
                                                    onChange={(value) => {
                                                        setNewContent(value);
                                                        field.onChange(value);
                                                    }}
                                                />
                                            </div>
                                            {preview && (
                                                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-900 overflow-x-auto">
                                                    <MarkdownEditor.Markdown 
                                                        source={newContent} 
                                                        style={{ color: "#ffffff", backgroundColor: "transparent" }} 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Settings Sidebar (Right) */}
                        <div className="flex flex-col gap-6 sticky top-[90px]">

                            {/* Publishing Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors flex flex-col gap-4">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">Publishing</h3>

                                <Controller
                                    name="visibility"
                                    control={control}
                                    defaultValue={true}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Visibility</label>
                                            <select
                                                {...field}
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium transition-colors cursor-pointer"
                                                value={String(field.value)}
                                            >
                                                <option value="true">Public (Live)</option>
                                                <option value="false">Hidden (Draft)</option>
                                            </select>
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="createdby"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Author (Created By)</label>
                                            <input
                                                {...field}
                                                placeholder="Author name..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                                            />
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={category}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Category</label>
                                            <input
                                                {...field}
                                                placeholder="e.g. cricket, wwe..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                                            />
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Media Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors flex flex-col gap-4">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">Media</h3>

                                {/* Image Preview */}
                                <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            height={400}
                                            width={600}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm font-medium">No Image</span>
                                    )}
                                </div>

                                <Controller
                                    name="blogImageUrl"
                                    control={control}
                                    defaultValue={blogImageUrl}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Image URL</label>
                                            <input
                                                {...field}
                                                placeholder="https://..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                                            />
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="featuredImagealt"
                                    control={control}
                                    defaultValue={featuredImagealt}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Image Alt Text</label>
                                            <input
                                                {...field}
                                                placeholder="Describe the image..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                                            />
                                        </div>
                                    )}
                                />
                            </div>

                            {/* SEO / Meta Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors flex flex-col gap-4">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">SEO & Meta</h3>

                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={title || ""}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Article Title</label>
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Article Title..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm transition-colors"
                                            />
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="slug"
                                    control={control}
                                    defaultValue={slug || ""}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">URL Slug</label>
                                            <input
                                                {...field}
                                                placeholder="url-friendly-slug"
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm lowercase transition-colors font-mono"
                                            />
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={description ?? ""}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold">Meta Description</label>
                                            <textarea
                                                {...field}
                                                placeholder="Brief description for search engines..."
                                                className="w-full outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm min-h-[100px] resize-none transition-colors"
                                            />
                                        </div>
                                    )}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </section>}
        </>
    );
};

export default ContentEditor;
