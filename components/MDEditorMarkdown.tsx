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
                        </blockquote>)
                }
            }
        />
    )
}

export default MDEditorMarkdown