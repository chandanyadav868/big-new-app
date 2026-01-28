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