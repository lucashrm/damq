<script setup lang="ts">

const discord_username = useState<User>("localUser").value.username;


</script>

<template>
  <h1>Damq</h1>
  <div>
    <h2>Bienvenue {{ discord_username }}</h2>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  text-align: center;
  margin-top: 50px;
}
</style>