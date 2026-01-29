import * as React from 'react'

interface AmpParagraphProps {
  /** Text */
  text: string,
  className:string,
  children:any
  // TODO add more props
}

export const AmpParagraph: React.FC<AmpParagraphProps> = (props: AmpParagraphProps) => {
  const { text,children ,...rest } = props
  const bindProps:any = {}
  bindProps[`data-amp-bind-${text}`] = text

  return (
  <p {...bindProps} {...rest}>
    {children}
  </p>
)}