<template>
  <div class="variants-section" v-if="variants && variants.length > 0">
    <div class="variants-header">Доступные модели:</div>
    <div class="variants-grid">
      <div v-for="(variant, idx) in variants" :key="idx" class="variant-item">
        <span class="model-name">{{ variant.model }}</span>
        <span class="model-price">{{ variant.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variants: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.variants-section {
  background: var(--bg-secondary);
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.variants-header {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.variants-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--bg-card);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.model-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.model-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-color);
}
</style>