import './globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import AdsterraDirectLink from './components/AdsterraDirectLink'

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
  const isProduction = process.env.NODE_ENV === 'production'
  const isValidAdsenseId = adsenseId && adsenseId !== 'ca-pub-xxxxxxxxxxxxxxxxx' && adsenseId !== 'ca-pub-1500176085727924'

  return (
    <html lang="zh">
      <head>
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
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {/* Adsterra Direct Link 广告 */}
        <AdsterraDirectLink />
      </body>
    </html>
  )
}