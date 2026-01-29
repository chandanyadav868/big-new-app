import * as React from 'react'

export const AmpStoryBookend: React.FC<JSX.IntrinsicElements['amp-story-bookend']> = (props) => {
  const { src } = props
  return (
  <amp-story-bookend src={src} layout="nodisplay">
  </amp-story-bookend>
)}