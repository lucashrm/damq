<script lang="ts" setup>
  import { DiscordSDK, patchUrlMappings } from "@discord/embedded-app-sdk";

  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
  let auth;

  setupDiscordSdk().then(() => {
    console.log(`Discord SDK ready!`);
  });

  async function setupDiscordSdk() {
    await discordSdk.ready();
    console.log("Discord SDK is ready");

    const { code } = await discordSdk.commands.authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: [
        "identify",
        "guilds",
        "applications.commands"
      ],
    });

    interface TokenResponse {
      access_token: string;
    }

    const { access_token }  = await $fetch<TokenResponse>(`/.proxy/api/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: code
    });

    auth = await discordSdk.commands.authenticate({
      access_token,
    });

    if (auth == null) {
      throw new Error("Authenticate command failed");
    }
  }
</script>

<template>
  <div>
    prout
  </div>
</template>

<style scoped>
</style>