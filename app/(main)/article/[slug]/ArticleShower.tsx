"use client"
import React from 'react'
import { SingleArticleProps } from '@/lib/readux/singleArticleFetched';
import ArticleShowerComp from '@/components/ArticleShowerComponents/ArticleShowerComp';
import RelatedArticleFetch from '@/components/RelatedArticleFetch';

interface ArticleShowerProps {
    backendSendArticle: SingleArticleProps
}

function ArticleShower({ backendSendArticle }: ArticleShowerProps) {
    // console.log({ backendSendArticle });
    return (
        <>
          {/* article portion */}
            { backendSendArticle && <ArticleShowerComp key={backendSendArticle._id} {...backendSendArticle as SingleArticleProps} />}

            {/* related article portion */}
            {backendSendArticle?.category && <RelatedArticleFetch category={backendSendArticle.category}/>}
        </>
    )
}

export default ArticleShower
