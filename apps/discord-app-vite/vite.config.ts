/// <reference types='vitest' />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';

export default defineConfig(() => ({
  cacheDir: '../../node_modules/.vite/discord-app-vite',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())]
    }
  },
  root: `${process.cwd()}/apps/discord-app-vite`,
  resolve: {
    alias: {
      // '@prj/types/api': path.join(
      //   __dirname,
      //   '../../libs/common/src/types/api/index.ts'
      // ),
      // '@components/': path.resolve(
      //   __dirname,
      //   '/apps/discord-app-vite/src/components/'
      // ),
      // '@elements/': path.resolve(
      //   __dirname,
      //   '/apps/discord-app-vite/src/elements/'
      // ),
      // '@constants': path.resolve(
      //   __dirname,
      //   '/apps/discord-app-vite/src/constants/index.ts'
      // ),
      // '@services': path.resolve(
      //   __dirname,
      //   '/apps/discord-app-vite/src/services/index.ts'
      // ),
      // '@utils': path.resolve(
      //   __dirname,
      //   '/apps/discord-app-vite/src/utils/index.ts'
      // ),
      // '@redux/': path.resolve(__dirname, '/apps/discord-app-vite/src/redux/'),
      // '@pages': path.resolve(__dirname, './apps/discord-app-vite/src/pages/'),
      // '@layouts': path.resolve(
      //   __dirname,
      //   './apps/discord-app-vite/src/layouts/'
      // )
      '@/': `${process.cwd()}/apps/discord-app-vite/src/`,
      '@components': `${process.cwd()}/apps/discord-app-vite/src/components/`,
      '@elements': `${process.cwd()}/apps/discord-app-vite/src/elements/`,
      '@constants': `${process.cwd()}/apps/discord-app-vite/src/constants/index.ts`,
      '@services': `${process.cwd()}/apps/discord-app-vite/src/services/index.ts`,
      '@utils': `${process.cwd()}/apps/discord-app-vite/src/utils/index.ts`,
      '@redux': `${process.cwd()}/apps/discord-app-vite/src/redux/`,
      '@pages': `${process.cwd()}/apps/discord-app-vite/src/pages/`,
      '@layouts': `${process.cwd()}/apps/discord-app-vite/src/layouts/`
    }
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },

  build: {
    outDir: 'dist'
  }
}));
