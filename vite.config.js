import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { readdir, rm, writeFile } from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    root: 'app',
    build: {
      outDir: '../static/svelte',
      emptyOutDir: true,
      assetsDir: '',
      // sourcemap: 'inline', // enable for debugging
    },
    server: {
      port: 4200,
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'import'],
          sassOptions: {
            quietDeps: true,
            silenceDeprecations: ['legacy-js-api', 'import']
          }
        }
      }
    },
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true,
        }
      }),
      syncToHugo()
    ]
  }
})

function syncToHugo() {

  return {
    closeBundle: async () => {
      const svelteBuild = './static/svelte';
      try {
        const assets = await readdir(svelteBuild);
        const js = assets.filter(name => name.match(/(index.)(?!.*?esm)(?!.*?css).*\w+/))[0];
        const css = assets.filter(name => name.includes('.css'))[0];
        const token = Math.floor(Math.random() * 69420);
        await Promise.all([
          writeFile(`./data/svelte.json`, JSON.stringify({ js, css, token })),
          rm('./static/svelte/index.html')
        ]);
        console.log(`wrote ${js} to hugo data`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('svelte build directory not found, skipping sync');
        } else {
          throw error;
        }
      }
    }
  }
}