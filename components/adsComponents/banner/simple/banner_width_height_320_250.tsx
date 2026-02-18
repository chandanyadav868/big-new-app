"use client";

import React, { useEffect, useRef } from 'react'

function Banner_width_height_320_250() {
  const adsRef = useRef<HTMLDivElement>(null);
  
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
    }, []);

    
  return (
    <div
      ref={adsRef}
      style={{
        maxWidth: "300px",
        height: "250px",
        margin: "16px auto",
        overflow: "hidden"
      }}
    />
  );
}

export default Banner_width_height_320_250