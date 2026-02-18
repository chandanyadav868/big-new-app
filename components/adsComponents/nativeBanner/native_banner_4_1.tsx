"use client";

import React, { useEffect, useRef } from 'react'

function Native_banner_4_1() {
  const dataText = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    if (dataText.current !== null) {
      const createScript = document.createElement("script");
      createScript.src = "https://pl28737563.effectivegatecpm.com/7fbfd684b6cad6d0ccca08d1b524a028/invoke.js";
      createScript.async = true;
      createScript.setAttribute("data-cfasync","false")
      dataText.current.appendChild(createScript)
    }
  },[])
  return (
    <div ref={dataText}>
      <div 
        id="container-7fbfd684b6cad6d0ccca08d1b524a028"></div>
    </div>
  )
}

export default Native_banner_4_1