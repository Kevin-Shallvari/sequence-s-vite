import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import x from 'babel-plugin-transform-goober'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
