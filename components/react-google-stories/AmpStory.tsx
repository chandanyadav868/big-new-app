import * as React from 'react'

export const AmpStory: React.FC<JSX.IntrinsicElements["amp-story"]> = (props) => {
  const { children, ...rest } = props
  return (
    <amp-story {...rest}>
      {children}
    </amp-story>
  )
}