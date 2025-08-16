import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
    ,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/android-chrome-512x512.png', 'robots.txt'],
      manifest: {
        name: 'Binaural Beam',
        short_name: 'Binaural',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
