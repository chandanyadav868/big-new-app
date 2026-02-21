"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'

function Banner_width_height_320_250({classname}:{classname?:string}) {
  const adsRef = useRef<HTMLDivElement>(null);
  const [adLoaded,setAdLoaded] = useState(false)
  
    useEffect(() => {
      if (!adsRef.current) return;
  
      // Prevent double execution
      if (adsRef.current.childNodes.length > 0) return;
  
      // 1️⃣ Config script
      const configScript = document.createElement("script");
      configScript.innerHTML = `
        var atOptions = {
            'key' : '0f50f08a8c305f85cf2a3d57c1ce1eb4',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
        };
      `;
  
      // 2️⃣ Invoke script
      const invokeScript = document.createElement("script");
      invokeScript.src =
        "https://www.highperformanceformat.com/0f50f08a8c305f85cf2a3d57c1ce1eb4/invoke.js";
      invokeScript.async = true;
  
      adsRef.current.appendChild(configScript);
      adsRef.current.appendChild(invokeScript);

       const checkAds = setInterval(()=>{
      const iframe = adsRef.current?.querySelector("iframe");
      if (iframe) {
        setAdLoaded(true);
        clearInterval(checkAds)
      }
    },300);

      return()=>{

      }
    }, []);

    
  return (
    <div
      style={{
        maxWidth: "300px",
        height: "250px",
        overflow: "hidden",
      }}
      className={cn(`rounded-md ${classname}`)}
    >
      {!adLoaded && (
        <div
          style={{
            width:"300px",
            height:"100%",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#6b7280",
            borderRadius: "6px",
          }}
        >
          Loading advertisement…
        </div>
      )}

      {/* 📢 Ad container */}
      <div
        ref={adsRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default Banner_width_height_320_250