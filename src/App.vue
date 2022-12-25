<script setup lang="ts">
import Tree from './components/Tree.vue'
</script>

<template>
  <main class="app">
    <Tree />
  </main>
</template>

<style scoped>
 .app {
  width: 450px;
  display: flex;
  min-height: 100vh;
  margin: 8vh auto;
  flex-direction: column;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
 }
</style>
