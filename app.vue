<script lang="ts" setup>
import {DiscordSDK, Events, type Types} from "@discord/embedded-app-sdk";
import {useState} from "#app";

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
const localUser = useState<User | null> ("localUser", () => null);

setupDiscordSdk().then(() => {
  console.log(`Discord SDK ready!`);
});

function updateParticipants(participants: Types.GetActivityInstanceConnectedParticipantsResponse) {
  console.log("participants", participants);
}

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

  const { user } = await discordSdk.commands.authenticate({
    access_token,
  });

  if (user == null) {
    throw new Error("Authenticate command failed");
  }

  localUser.value = user;
  let user_id = user.id;

  const resp = await $fetch(`/.proxy/api/fetch_user_db`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: user_id
  });

  const participants = await discordSdk.commands.getInstanceConnectedParticipants();

  await discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);

  if (resp == "User not found") {
    console.log("User not found");
    navigateTo("/connect");
  } else {
    navigateTo("/menu");
  }
}

</script>

<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style scoped>
</style>