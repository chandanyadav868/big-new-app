import * as React from 'react'

interface AmpSourceProps {
    src: string,
    type: string,
    className: string
}

export const AmpSource: React.FC<AmpSourceProps> = (props) => {
    return (
        <source {...props} />
    )
}