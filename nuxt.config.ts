// https://nuxt.com/docs/api/configuration/nuxt-config
import {fa} from "cronstrue/dist/i18n/locales/fa";

export default defineNuxtConfig({
  app: {
    baseURL: "/.proxy/",
  },
  modules: ["nuxt-security"],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ["~/assets/css/style.css"],
  vite: {
    server: {
      allowedHosts: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    }
  },
  security: {
    headers: {
      xFrameOptions: false,
      contentSecurityPolicy: {
        'connect-src': ["https://1336812781219090482.discordsays.com/.proxy/", "wss://1336812781219090482.discordsays.com/.proxy/", "https://discord.com/api/", "https://canary.discord.com/api/", "https://ptb.discord.com/api/", "https://cdn.discordapp.com/app-assets/", "https://cdn.discordapp.com/attachments/", "https://cdn.discordapp.com/avatars/", "https://cdn.discordapp.com/embed/", "https://cdn.discordapp.com/ephemeral-attachments/", "https://cdn.discordapp.com/guilds/", "https://cdn.discordapp.com/icons/", "https://media.discordapp.net/app-assets/", "https://media.discordapp.net/attachments/", "https://media.discordapp.net/avatars/", "https://media.discordapp.net/embed/", "https://media.discordapp.net/ephemeral-attachments/", "https://media.discordapp.net/guilds/", "https://media.discordapp.net/icons/"],
        'style-src': ["'self'", "'nonce-{{nonce}}'"],
        'script-src': ["'self'", "'nonce-{{nonce}}'", "'unsafe-eval'"],
      }
    },
    ssg: {
      hashStyles: true
    }
  },
})

