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