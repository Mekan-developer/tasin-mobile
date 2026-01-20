<template>
  <div id="app" class="min-h-screen">
    <header class="flex flex-row justify-between items-center w-full h-[76px] box-border p-4 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors ease-in-out duration-300">
      <HeaderMain />
    </header>

    <main class="bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors ease-in-out duration-300 p-4 h-[calc(100vh-76px)]">
      <TheWelcome />
    </main>
  </div>
</template>

<script setup>
import HeaderMain from './components/headers/HeaderMain.vue'
</script>

<style>
/* #app {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease;
} */


</style>
