import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.snt.ispmedia',
  appName: 'ispmedia-mobile',
  webDir: 'dist/ispmedia-angular/browser/',
  server: {
    url: 'https://192.168.1.100:4200', // URL do servidor de desenvolvimento Angular
    cleartext: true
  }
};

export default config;
