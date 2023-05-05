import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './build/plugins';
import { wrapperEnv } from './build/getEnv';
import { createProxy } from './build/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, mode);
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY, VITE_OPEN } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(VITE_PROXY),
    },
    // build: {
    //   outDir: 'dist',
    //   minify: 'esbuild',
    // },
    plugins: createVitePlugins(viteEnv),
  };
});
