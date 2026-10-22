import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { I18nProvider } from '@/components/i18n/I18nProvider'
import { getDictionary, isLocale, locales } from '@/lib/i18n'
import '../globals.css'

const SITE_URL = 'https://ceibosoftware.com.ar'
const GA_ID = 'G-1JH6TG2S9E'
const isProd = process.env.NODE_ENV === 'production'

// Solo existen /es y /en; cualquier otro idioma da 404.
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
        'x-default': '/es',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: 'Ceibo Software',
      locale: t.meta.ogLocale,
      type: 'website',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale}>
      {isProd && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      <body className="antialiased">
        <I18nProvider locale={locale}>{children}</I18nProvider>
        {isProd && <Analytics />}
      </body>
    </html>
  )
}
