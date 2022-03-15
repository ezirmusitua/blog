import Head from 'next/head'
import Script from "next/script"
import Header from '../components/Header'
import metadata from '../metadata'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{metadata.site_title}</title>
      </Head>
      <Script
        src="https://hm.baidu.com/hm.js?e01824f8feb9b9ad2bf453f176dae752"
      ></Script>
      <Script
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

      <Header />
      <main className='container'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
