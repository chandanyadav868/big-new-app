"use client"
import React from 'react'
import { SingleArticleProps } from '@/lib/readux/singleArticleFetched';
import ArticleShowerComp from '@/components/ArticleShowerComponents/ArticleShowerComp';
import RelatedArticleFetch from '@/components/RelatedArticleFetch';
import Script from 'next/script';
import AdsenseAd from '@/components/adsComponents/googleAds/AdsenseAd';

interface ArticleShowerProps {
    backendSendArticle: SingleArticleProps
}

function ArticleShower({ backendSendArticle }: ArticleShowerProps) {
    return (
        <main className="max-w-[1280px] mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                
                {/* Left Column: Main Article Content */}
                <article className="min-w-0">
                    {backendSendArticle && <ArticleShowerComp key={backendSendArticle._id} {...backendSendArticle as SingleArticleProps} />}
                </article>

                {/* Right Column: Sticky Related Articles Sidebar */}
                <aside className="relative">
                    <div className="sticky top-24 flex flex-col gap-6">
                        {/* Ad Placeholder */}
                        {/* <AdsenseAd slot="1253980996" /> */}

                        {/* Related Articles */}
                        {backendSendArticle?.category && (
                            <div className="news-card p-4">
                                <RelatedArticleFetch category={backendSendArticle.category} />
                            </div>
                        )}
                    </div>
                </aside>
                
            </div>
        </main>
    )
}

export default ArticleShower
