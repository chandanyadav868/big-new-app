import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs:string[]) => {
  return twMerge(clsx(inputs));
};


export const dateformate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC", // 🔥 IMPORTANT
  }).format(new Date(date));
};

 export const slugChangeIntoTitle = (data:string)=>{
    const title = data.split(/[/-]/).join(" ");    
    return title
 }

export const slugChangeIntoUrl = (data:string)=>{
    const match = data.match(/^\/([^/]+)\/(.+)/);
    let secondPart= ""
    if (match) {
        // const firstPart = match[1]; // "wwe"
        // console.log(firstPart); // debugging
        secondPart = match[2]; // "news-dakota-kai-unhappy-real-life-wwe-superstar-boyfriend-s-recent-actions"
        // console.log(secondPart);
    }
    // console.log(secondPart); // debugging
    
    return secondPart
}

export const articleSlug = ({slug,createdAt}:{slug:string|undefined,createdAt:string|undefined})=>{
  return `/article/${slug}`
}


export const mandatoryHtml = `
  <html amp="" lang="en">
 <head>
  <meta charset="utf-8" />
  <meta
   name="viewport"
   content="width=device-width,minimum-scale=1,initial-scale=1"
  />
  <script
   async=""
   src="https://cdn.ampproject.org/v0.js"
  ></script>
  <script
   async=""
   src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
   custom-element="amp-story"
  ></script>
  <link
   href="https://fonts.googleapis.com/css2?display=swap&amp;family=Playfair+Display&amp;family=Oswald%3Awght%40400%3B500%3B700&amp;family=Lora"
   rel="stylesheet"
  />
  <link
   href="https://wp.stories.google/static/21/images/templates/experience-thailand/page1_bg.jpg"
   rel="preload"
   as="image"
  />
  <style amp-boilerplate="">
   body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  </style>
  <noscript>
   <style amp-boilerplate="">
    body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
   </style>
  </noscript>

  <style amp-custom="">
   
  </style>

  <meta
   name="web-stories-replace-head-start"
  />
  <title>
   Experience Thailand Country
  </title>
  <link
   rel="canonical"
   href="https://humantalking.com/web-stories"
  />
  <meta
   name="web-stories-replace-head-end"
  />
 </head>
 {body}
</html>`
