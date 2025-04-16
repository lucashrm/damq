<script setup lang="ts">
  import {useState} from "#app";
  import {DiscordSDK, type Types} from "@discord/embedded-app-sdk";

  const localParticipants = useState<Types.GetActivityInstanceConnectedParticipantsResponse>("participants");
</script>

<template>
  <div v-for="participant in localParticipants.participants">
    <div class="player">
      {{ participant.nickname }}
      <img v-if="participant.avatar" :src="`https://cdn.discordapp.com/avatars/${participant.id}/${participant.avatar}.png?size=256`">
    </div>

  </div>
</template>

<style scoped>

</style>