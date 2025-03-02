<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');

async function setup() {
  console.log(username.value);

  const response = await $fetch('/.proxy/api/fetch_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: username.value
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