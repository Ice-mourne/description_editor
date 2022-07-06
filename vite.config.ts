import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@assets': path.resolve(__dirname, './src/assets'),
         '@components': path.resolve(__dirname, './src/components'),
         '@data': path.resolve(__dirname, './src/data'),
         '@utils': path.resolve(__dirname, './src/utils'),

         // remove ones bellow
         '@styles': path.resolve(__dirname, './src/component_styles'),
         '@ts': path.resolve(__dirname, './src/ts'),
         '@interfaces': path.resolve(__dirname, './src/interfaces')
      }
   },
   base: './',
   build: {
      target: 'esnext'
   }
})
