<script setup lang="ts">
  const { data } = await useFetch("http://localhost:8080/hey")
</script>

<template>
  <h1>DAMQ</h1>
  <p>{{ data }}</p>
</template>

<style scoped>

</style>