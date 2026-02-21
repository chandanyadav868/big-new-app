"use client";

import { useEffect } from "react";

type AdsenseAdProps = {
  slot: string;
  format?: string;
  responsive?: boolean;
};

export default function AdsenseAd({
  slot,
  format = "auto",
  responsive = true,
}: AdsenseAdProps) {
  useEffect(() => {
    try {
      // push ad after component mounts
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8992643519669296"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}