"use client";
import Script from "next/script";

function GTag() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-N492P39EKV"
      onLoad={() => {
        // @ts-ignore
        const dataLayer = window.dataLayer || [];
        function gtag(arg1: any, arg2: any) {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-N492P39EKV");
      }}
    ></Script>
  );
}

export default GTag;
