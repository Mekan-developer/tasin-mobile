<template>
  <div id="app" class="flex flex-col h-[100%] pb-0">
    <MainLayout>
      <RouterView />
      <button v-if="needRefresh" @click="updateApp" class="pwa-update-btn">
      🔄 Обновить приложение
    </button>
    </MainLayout>
  </div>
</template>

<script setup>
import MainLayout from './views/layouts/MainLayout.vue'

</script>

<style>
.pwa-update-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>