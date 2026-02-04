import MDEditor from '@uiw/react-md-editor'
import React from 'react'

function MDEditorMarkdown({ content }: { content: string }) {

    return (
        <MDEditor.Markdown source={content} style={{ backgroundColor: "#ffffff00", color: "black" }}
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
                }
            }
        />
    )
}

export default MDEditorMarkdown