import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'fincheck-as',
      project: 'fincheck',
      sourcemaps: {
        filesToDeleteAfterUpload: ['./dist/assets/*.js.map'],
      },
    }),
  ],
  server: {
    open: true,
    port: 3001,
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
