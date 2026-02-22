import React from 'react'

function PreviewStory({ stories }:{stories:string}) {
    return (
        <div className='p-1'>
            <iframe
            className='sticky top-0 mt-10 z-30 pt-10 min-w:[375px] max-[375px]:w-full '
                srcDoc={stories}
                style={{ height: "675px", aspectRatio: "9/16", border: "1px solid black", borderRadius:10, padding:"10px" }}
            />
        </div>
    )
}

export default React.memo(PreviewStory)