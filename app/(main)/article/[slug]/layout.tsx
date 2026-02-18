import Script from "next/script";
import React from "react";



export default function ArticleRootPage({children}:Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
        {/* <Header/> */}
        {children}
                
        </>
    )
}