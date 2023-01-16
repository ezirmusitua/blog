import GTag from "components/GTag";
import config from "config";
import Script from "next/script";

export function DefaultMeta() {
  return (
    <>
      <link rel="icon" href="/favicon.ico"></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
      ></link>
      <meta name="msapplication-TileColor" content="#2b5797"></meta>
      <meta name="theme-color" content="#ffffff"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <Script src="https://hm.baidu.com/hm.js?e01824f8feb9b9ad2bf453f176dae752"></Script>
      <GTag></GTag>
    </>
  );
}

function RootHead() {
  return (
    <head>
      <title>{config.site_title}</title>
      <meta
        name="description"
        content="ezirmusitua's blog
        email: jferroal@gmail.com,
        github: https://github.com/ezirmusitua"
      ></meta>
      <DefaultMeta></DefaultMeta>
    </head>
  );
}

export default RootHead;
