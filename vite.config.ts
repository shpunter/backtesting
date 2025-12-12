import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { PluginOption, ConfigEnv } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { cloudflare } from '@cloudflare/vite-plugin'
import type { UserConfig } from 'vite'; 

type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;


const config: UserConfigFn = ({ mode }: ConfigEnv) => { 
  const isTest = mode === 'test';

  return {
    plugins: [
      devtools(),
      // Conditionally load file-intensive plugins
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      !isTest && tailwindcss(),
      tanstackStart(),
      viteReact(),
      cloudflare({ viteEnvironment: { name: 'ssr' } }),
    ].filter(Boolean) as PluginOption[], 
    
    server: {
      middlewareMode: false,
      watch: {
        ignored: ['**/*.ts'],
        disable: isTest,
      },
    },
    test: {
      reporters: ['default', 'hanging-process'],
    },
  } as UserConfig;
};

export default config