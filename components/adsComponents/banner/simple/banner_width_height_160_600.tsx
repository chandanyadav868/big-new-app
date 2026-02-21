"use client";

import { useEffect, useRef, useState } from "react";

function Banner_width_height_160_600() {
  const adsRef = useRef<HTMLDivElement>(null);
  const [adLoaded,setLoadedAds] = useState(false);

  useEffect(() => {
    if (!adsRef.current) return;

    // Prevent double execution
    if (adsRef.current.childNodes.length > 0) return;

    // 1️⃣ Config script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
       atOptions = {
        'key' : '72a725b95cb0c4ed2e9a774dab65af02',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
    };
    `;

    // 2️⃣ Invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/72a725b95cb0c4ed2e9a774dab65af02/invoke.js";
    invokeScript.async = true;

    adsRef.current.appendChild(configScript);
    adsRef.current.appendChild(invokeScript);

    const checkAds = setInterval(()=>{
      const iframe = adsRef.current?.querySelector("iframe");
      if (iframe) {
        setLoadedAds(true);
        clearInterval(checkAds)
      }
    },300);

    return ()=>{
      clearInterval(checkAds)
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "160px",
        height: "700px",
        margin: "16px auto",
        overflow: "hidden",
        // backgroundColor:"red",
        position:"sticky",
        zIndex:60,
        top:"0px"
      }}
    >
       {/* 🔄 Fallback UI */}
      {!adLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
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

export default Banner_width_height_160_600;
