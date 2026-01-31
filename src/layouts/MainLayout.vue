<template>
  <div class="layout   ">
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
/* Высота 100% чтобы main (flex:1) занял оставшееся место, футер всегда внизу */
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--bg-secondary);
  position: relative;
}

/* Высота из base.css (--header-height): 86px до 768px, 64px с 768px — как HeaderItem */
.layout-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 0 16px;
  padding-top: env(safe-area-inset-top, 0px);
  padding-left: calc(16px + env(safe-area-inset-left, 0px));
  padding-right: calc(16px + env(safe-area-inset-right, 0px));
  height: var(--header-height);
  min-height: calc(var(--header-height) + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}

/* flex: 1 + min-height: 0 — main занимает оставшееся место и скроллится, футер всегда внизу вьюпорта */
.layout-main {
  flex: 1 1 0;
  min-height: 0;
  height: calc(100% - 186px);
  padding-bottom: 72px;
  overflow-y: auto;
}

/* Нижняя навигация прижата к низу экрана; в PWA учитываем safe-area */
.layout-footer {
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--footer-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--footer-border);
  padding-bottom: max(12px, env(safe-area-inset-bottom, 0px), constant(safe-area-inset-bottom, 0px));
  transition: background-color 0.3s, border-color 0.3s;
  height: auto;
  min-height: 60px;
  box-sizing: border-box;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

@media (min-width: 768px) {
  .layout-header {
    padding: 0 24px;
  }

  .layout-main {
    padding-bottom: 80px;
  }
}

/* Desktop: хедер и основной блок адаптированы под широкий экран */
@media (min-width: 1024px) {
  .layout-header {
    padding: 0 32px;
  }

  .layout-main {
    padding-bottom: 88px;
  }

  .layout-footer {
    padding: 12px 32px;
  }
}

@media (min-width: 1280px) {
  .layout-header {
    padding: 0 48px;
  }

  .layout-footer {
    padding: 14px 48px;
  }
}
</style>
