import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ItemPopup": path.resolve(__dirname, "src/components/itemPopup/exports.ts"),
      "@SideBar": path.resolve(__dirname, "src/components/sideBar/exports.ts"),

      '@styles': path.resolve(__dirname, './src/component_styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ts': path.resolve(__dirname, './src/ts'),
    }
  }
})