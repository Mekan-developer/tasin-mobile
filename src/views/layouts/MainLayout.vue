<template>
  <div class="layout">
    <!-- Header -->
    <header class="layout-header" v-show="!$route.meta.hideHeader">
      <AppHeader />
    </header>

    <!-- Main content -->
    <main class="layout-main">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="layout-footer">
      <AppFooter />
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--bg-secondary);
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 0 16px;
  height: 86px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}

.layout-main {
  padding-bottom: 72px;
}

.layout-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Увеличьте z-index */
  background-color: var(--footer-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--footer-border);
  transition: background-color 0.3s, border-color 0.3s;
  height: auto; /* Добавьте это */
  min-height: 60px; /* Добавьте это */
}

@media (min-width: 768px) {
  .layout-header {
    height: 64px;
    padding: 0 24px;
  }

  .layout-main {
    padding-bottom: 80px;
  }
}
</style>
