"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Analytics tags load ONLY after (a) the user grants cookie consent and (b) the
// matching NEXT_PUBLIC_* id is set. Consent is read from localStorage and kept in
// sync via the "cookie-consent-change" window event dispatched by the banner.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// One gtag.js include powers BOTH GA4 and Google Ads (Merchant/remarketing +
// conversions). Load it if either id is set, then config each one present.
const GTAG_BOOTSTRAP_ID = GA_ID || GOOGLE_ADS_ID;

export default function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setGranted(localStorage.getItem("cookie-consent") === "granted");
      } catch {
        setGranted(false);
      }
    };
    read();
    window.addEventListener("cookie-consent-change", read);
    return () => window.removeEventListener("cookie-consent-change", read);
  }, []);

  if (!granted) return null;

  return (
    <>
      {GTAG_BOOTSTRAP_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_BOOTSTRAP_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-base" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());${
              GA_ID ? `gtag('config','${GA_ID}');` : ""
            }${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}`}
          </Script>
        </>
      ) : null}

      {FB_PIXEL_ID ? (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {CLARITY_ID ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      ) : null}
    </>
  );
}
