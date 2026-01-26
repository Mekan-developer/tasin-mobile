<template>
  <header class="category-header">
    <button class="back-button" @click="$router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <div class="header-text">
      <h1 class="page-title">{{ categoryName }}</h1>
      <span class="product-count">{{ productCount }} товаров</span>
    </div>
  </header>
</template>

<script setup>
defineProps({
  categoryName: {
    type: String,
    required: true
  },
  productCount: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.category-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background-color: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.back-button {
  background: var(--bg-secondary);
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all 0.2s;
}

.back-button:active {
  transform: scale(0.9);
}

.header-text {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.product-count {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>