import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Local Development Serverless API Integration
function serverlessDevPlugin() {
  return {
    name: 'serverless-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const url = req.url.split('?')[0];
            let handlerModule = null;
            if (url.startsWith('/api/enquiries')) {
              handlerModule = await server.ssrLoadModule('/api/enquiries.js');
            } else if (url.startsWith('/api/health')) {
              handlerModule = await server.ssrLoadModule('/api/health.js');
            } else if (url.startsWith('/api/auth')) {
              handlerModule = await server.ssrLoadModule('/api/auth.js');
            } else if (url.startsWith('/api/settings')) {
              handlerModule = await server.ssrLoadModule('/api/settings.js');
            } else if (url.startsWith('/api/products')) {
              handlerModule = await server.ssrLoadModule('/api/products.js');
            }

            if (handlerModule && handlerModule.default) {
              return handlerModule.default(req, res);
            }
            next();
          } catch (err) {
            console.error('[Vite Dev API Server Error]:', err);
            next();
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [react(), serverlessDevPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});
