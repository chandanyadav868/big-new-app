import MDEditor from '@uiw/react-md-editor'
import React from 'react'

function MDEditorMarkdown({ content }: { content: string }) {

    return (
        <MDEditor.Markdown source={content} style={{ backgroundColor: "#ffffff00", color: "black", }}
            components={
                {
                    blockquote: ({ children }) => (
                        <blockquote style={{ color: 'black' }}>
                            {children}
                        </blockquote>),
                    tr:({children})=>(
                        <tr style={{background:"white",color:"black"}}>
                            {children}
                        </tr>
                    ),
                    h1:({children})=>(
                        <h1 style={{fontSize:"1.5rem"}}>
                            {children}
                        </h1>
                    ),
                    h2:({children})=>(
                        <h1 style={{fontSize:"1.2rem"}}>
                            {children}
                        </h1>
                    )
                }
            }
        />
    )
}

export default MDEditorMarkdown