import Script from 'next/script';
import { analyticsConfig } from '@/lib/config/env';

/**
 * Reusable analytics slot for the root layout. Each script only renders
 * once its env var is configured, so by default this renders nothing and
 * adds zero JavaScript to the site. Connecting a real GA4/Clarity project
 * later means only setting the env var — no layout changes required.
 *
 * Vercel Analytics is intentionally not wired here: it needs the
 * `@vercel/analytics` package added to package.json first. Once installed,
 * add `<Analytics />` from `@vercel/analytics/react` here, gated on
 * `analyticsConfig.vercelAnalyticsEnabled` for consistency with the rest of
 * this file.
 */
export function AnalyticsScripts() {
  return (
    <>
      {analyticsConfig.gaMeasurementId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.gaMeasurementId}');`}
          </Script>
        </>
      )}

      {analyticsConfig.clarityProjectId && (
        <Script id="ms-clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${analyticsConfig.clarityProjectId}");`}
        </Script>
      )}
    </>
  );
}
