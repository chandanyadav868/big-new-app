import * as React from 'react'

interface AmpQuoteProps {
  /** Text */
  text: string,
  className:string
  // TODO add more props
}

export const AmpQuote: React.FC<AmpQuoteProps> = (props: AmpQuoteProps) => {
  const { text, ...rest } = props
  const bindProps:any = {}
  bindProps[`data-amp-bind-${text}`] = text

  return (
  <q {...bindProps} {...rest}>
    {text}
  </q>
)}