import * as React from 'react'

interface AmpHeaderProps {
  /** Semantic level of header, renders h1/h2/h3... */
  level: 1 | 2 | 3 | 4 | 5 | 6,
  /** Header title */
  title: string,
  className:string,
  children:any
  // TODO add more props
}

export const AmpHeader: React.FC<AmpHeaderProps> = (props: AmpHeaderProps) => {
  const { title, children ,level, ...rest } = props
  const Component = `h${level || 1}`
  const bindProps:any = {}
  bindProps[`data-amp-bind-${title}`] = title

  return (
  <Component {...bindProps} {...rest}>
    {children}
  </Component>
)}