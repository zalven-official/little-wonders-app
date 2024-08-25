import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'LittleWondersApp',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    allowNavigation: [
      'little-wonders-server.vercel.app',
      '*.little-wonders-server.vercel.app',
      'localhost:8100/*',
      "cdn.discordapp.com",
      "*.cdn.discordapp.com",
    ]
  }
};

export default config;
