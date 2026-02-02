import React from 'react'

function PreviewStory({ stories }: { stories: string }) {
    return (
        <iframe
            srcDoc={stories}
            style={{ width: "320px", height: "480px", aspectRatio: "9/16", border: "none", margin: "0px auto", padding:"10px" }}
        />
    )
}

export default React.memo(PreviewStory)