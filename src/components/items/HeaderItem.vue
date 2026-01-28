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
/* Минималистичный хедер категории: чистый фон, тонкий разделитель */
.category-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.back-button {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: background 0.2s, transform 0.15s;
}

.back-button:active {
  background: var(--hover-bg);
  transform: scale(0.96);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.product-count {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
}

/* Планшет и десктоп: увеличенные отступы и типографика */
@media (min-width: 768px) {
  .category-header {
    padding: 18px 24px;
    gap: 20px;
  }

  .back-button {
    width: 44px;
    height: 44px;
  }

  .back-button:hover {
    background: var(--hover-bg, rgba(0, 0, 0, 0.04));
  }

  .page-title {
    font-size: 22px;
  }

  .product-count {
    font-size: 13px;
  }
}

@media (min-width: 1024px) {
  .category-header {
    padding: 20px 32px;
    gap: 24px;
  }

  .back-button {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 24px;
  }

  .product-count {
    font-size: 14px;
  }
}

@media (min-width: 1280px) {
  .category-header {
    padding: 24px 48px;
  }

  .page-title {
    font-size: 26px;
  }
}
</style>