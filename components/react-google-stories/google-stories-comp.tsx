declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-img': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string,
        width: string,
        height: string,
        layout: string,
      };

      'amp-story': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        title: string,
        publisher: string,
        'publisher-logo-src': string,
        'poster-portrait-src': string,
        children: any,
        // optional
        'poster-square-src'?: string,
        standalone: string
        // TODO add all optional https://amp.dev/documentation/components/amp-story/?format=stories#attributes
      };

      'amp-story-bookend': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        /** Path to .json config file */
        src: string,
        className?: string,
        layout?: string
      };

      'amp-story-grid-layer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        children: any,
        template: string,
        // TODO add all props
      };

      'amp-story-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      'amp-video': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        autoplay?: boolean,
        loop?: boolean,
        height: string,
        width: string,
        poster: string,
        layout: string,
      };
    }
  }
}

export { AmpStory } from './AmpStory'
export { AmpStoryPage } from './AmpStoryPage'
export { AmpStoryGridLayer } from './AmpStoryGridLayer'
export { AmpImg } from './AmpImg'
export { AmpHeader } from './AmpHeader'
export { AmpParagraph } from './AmpParagraph'
export { AmpQuote } from './AmpQuote'
export { AmpStoryBookend } from './AmpStoryBookend'
export { AmpSource } from './AmpSource'
export { AmpVideo } from './AmpVideo'