import Script from "next/script"

export default function Statistics() {
  return <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-N492P39EKV"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-N492P39EKV');
      }}
    ></Script>
    <Script
      async
      src="https://hm.baidu.com/hm.js?e01824f8feb9b9ad2bf453f176dae752"
    ></Script>
  </>
}