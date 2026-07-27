/**
 * Central place to read analytics/verification environment variables.
 * Every value is optional and defaults to "off" — nothing loads, and no
 * layout changes are needed, until these are actually set in the
 * environment. See .env.example for the full list.
 */
export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  vercelAnalyticsEnabled: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true',
} as const;
