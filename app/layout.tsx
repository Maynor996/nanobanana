import './globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import AdsterraDirectLink from './components/AdsterraDirectLink'
import SmartlinksAd from './components/SmartlinksAd'
import Footer from './components/Footer'

export const metadata = {
  title: 'Nano Banana - AI图像生成器 | AI Image Generator',
  description: '免费AI图像生成 | Free AI Image Generation | 使用Google Gemini 2.5 Flash生成图片 | Generate and Edit Images',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    other: [
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', url: '/icon-192.png', sizes: '192x192' }
    ]
  },
  manifest: '/manifest.json',
  themeColor: '#00d4aa',
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID
  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === 'true'
  const smartlinksEnabled = process.env.NEXT_PUBLIC_SMARTLINKS_ENABLED === 'true'
  const isProduction = process.env.NODE_ENV === 'production'
  const isValidAdsenseId = adsenseId && adsenseId !== 'ca-pub-xxxxxxxxxxxxxxxxx' && adsenseId !== 'ca-pub-1500176085727924'

  // Google Analytics 4 配置
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const isValidGaId = gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX'

  return (
    <html lang="zh">
      <head>
        {/* Google Analytics 4 脚本 - 仅在生产环境且有效ID时加载 */}
        {isProduction && isValidGaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense 脚本 - 仅在生产环境且有效ID时加载 */}
        {isProduction && isValidAdsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Adsterra 脚本 - 仅在生产环境且启用时加载 */}
        {isProduction && adsterraEnabled && (
          <script
            async
            src="//pl22089466.highrevenuenetwork.com/invoke.js"
          />
        )}
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '60px' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {/* Adsterra Direct Link 广告 */}
        <AdsterraDirectLink />

        {/* Smartlinks 广告 */}
        <SmartlinksAd />

        {/* 底部导航 */}
        <Footer />
      </body>
    </html>
  )
}