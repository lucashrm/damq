<script setup lang="ts">
import { ref } from 'vue';
import {useState} from "#app";

const username = ref('');

async function setup() {
  let user = useState<User>('localUser');

  const response = await $fetch('/.proxy/api/fetch_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      discord_id: user.value.id,
      anilist_username: username.value,
    }
  });

  console.log(response);
}

</script>

<template>
  <div class="start" id="app">
    <h1>DAMQ</h1>
    <button @click="setup">Start</button>
    <div>
      <label>
        Your Anilist username:
        <input type="text" id="username" v-model="username" />
      </label>
    </div>
  </div>
</template>

<style scoped>
</style>