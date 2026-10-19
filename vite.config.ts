import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const configuredOrigin = env.VITE_SITE_URL?.trim()
    || env.VITE_VERCEL_PROJECT_PRODUCTION_URL
    || env.VERCEL_PROJECT_PRODUCTION_URL
    || env.VITE_VERCEL_URL
    || env.VERCEL_URL
    || 'http://localhost:4173'
  const url = new URL(/^https?:\/\//.test(configuredOrigin) ? configuredOrigin : `https://${configuredOrigin}`)
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS.')
  return {
    plugins: [react(), tailwindcss(), {
      name: 'salon-social-metadata',
      transformIndexHtml: html => html.replaceAll('__SITE_ORIGIN__', url.origin),
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.origin}/</loc></url></urlset>\n`,
        })
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`,
        })
      },
    }],
    server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
    build: { target: 'es2022', sourcemap: false },
  }
})
