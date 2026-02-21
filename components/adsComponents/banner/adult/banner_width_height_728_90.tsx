"use client";

import { useEffect, useRef } from "react";

function Banner_width_height_728_90() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Prevent double execution
    if (adRef.current.childNodes.length > 0) return;

    // 1️⃣ Config script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      var atOptions = {
        'key' : '7917478b2f088edfe6daeed9ef05f6cd',
        'format' : 'iframe',
        'height' : 190,
        'width' : 728,
        'params' : {}
      };
    `;

    // 2️⃣ Invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/7917478b2f088edfe6daeed9ef05f6cd/invoke.js";
    invokeScript.async = true;

    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        maxWidth: "728px",
        height: "90px",
        margin: "16px auto",
        overflow: "hidden",
        // position:"sticky",
        // zIndex:60,
        // top:"0px"
      }}
    />
  );
}

export default Banner_width_height_728_90;
