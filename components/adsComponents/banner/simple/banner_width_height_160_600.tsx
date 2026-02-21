"use client";

import { useEffect, useRef } from "react";

function Banner_width_height_160_600() {
  const adsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div
      ref={adsRef}
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
    ></div>
  );
}

export default Banner_width_height_160_600;
