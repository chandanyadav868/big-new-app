"use client";

import { useEffect, useRef, useState } from "react";

function Banner_width_height_728_90() {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (!adRef.current) return;

    // prevent duplicate script injection
    if (adRef.current.childNodes.length > 0) return;

    // 1️⃣ Ad config
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      var atOptions = {
        'key' : '7917478b2f088edfe6daeed9ef05f6cd',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // 2️⃣ Ad invoke
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/7917478b2f088edfe6daeed9ef05f6cd/invoke.js";
    invokeScript.async = true;

    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);

    // 3️⃣ Detect iframe (ad loaded)
    const checkAd = setInterval(() => {
      const iframe = adRef.current?.querySelector("iframe");
      if (iframe) {
        setAdLoaded(true);
        clearInterval(checkAd);
      }
    }, 300);

    // cleanup
    return () => clearInterval(checkAd);
  }, []);

  return (
    <div
      style={{
        maxWidth: "728px",
        height: "90px",
        margin: "16px auto",
        position: "relative",
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
        ref={adRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default Banner_width_height_728_90;