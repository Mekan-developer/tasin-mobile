<template>
  <footer class="bottom-nav">
    <router-link to="/" class="nav-item">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <span class="label">Главная</span>
    </router-link>

    <router-link to="/search" class="nav-item">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      <span class="label">Поиск</span>
    </router-link>

    <router-link to="/cart" class="nav-item">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="badge">3</span>
      </div>
      <span class="label">Корзина</span>
    </router-link>

    <router-link to="/profile" class="nav-item">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <span class="label">Профиль</span>
      <button v-if="needRefresh" @click="updateApp" class="pwa-update-btn">
      🔄
    </button>
    </router-link>
  </footer>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRegisterSW } from 'virtual:pwa-register/vue'

  // Используйте встроенную регистрацию PWA
  const { needRefresh, updateServiceWorker } = useRegisterSW()

  const updateApp = () => {
    updateServiceWorker()
    window.location.reload()
  }

  onMounted(() => {
    // Показываем уведомление об обновлении
    if (needRefresh.value) {
      if (confirm('Доступно новое обновление. Перезагрузить приложение?')) {
        updateApp()
      }
    }
  })
</script>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 12px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  text-decoration: none;
  color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
  min-width: 64px;
  border-radius: 12px;
}

.nav-item:hover {
  color: var(--accent-color);
}

.nav-item:active {
  transform: scale(0.95);
}

.nav-item.router-link-active {
  color: var(--accent-color);
}

.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.icon-wrapper svg {
  width: 22px;
  height: 22px;
}

.label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: var(--badge-bg);
  color: white;
  font-size: 10px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  box-shadow: 0 2px 4px var(--shadow-color);
}

@media (min-width: 768px) {
  .nav-item {
    padding: 8px 24px;
    min-width: 80px;
  }
  
  .icon-wrapper svg {
    width: 24px;
    height: 24px;
  }
  
  .label {
    font-size: 12px;
  }
}
</style>
