<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  defineProps({
    variants: {
      type: Array,
      default: () => []
    }
  })

  const MOBILE_BREAKPOINT = 768
  const isMobile = ref(true)
  const isExpanded = ref(false)

  const showGrid = computed(() => !isMobile.value || isExpanded.value)

  function toggle() {
    isExpanded.value = !isExpanded.value
  }

  function checkMobile() {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    if (!isMobile.value) isExpanded.value = true
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
</script>


<template>
  <div class="variants-section" v-if="variants && variants.length > 0">
    <button
      type="button"
      class="variants-header"
      :class="{ 'is-mobile': isMobile, 'is-expanded': isExpanded }"
      :aria-expanded="isMobile ? isExpanded : true"
      @click="isMobile && toggle()"
    >
      <span>Доступные модели:</span>
      <svg v-if="isMobile" class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <Transition name="expand">
      <div v-show="showGrid" class="variants-grid">
        <div v-for="(variant, idx) in variants" :key="idx" class="variant-item">
          <span class="model-name">{{ variant.model }}</span>
          <span class="model-price">{{ variant.price }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Минимальный список вариантов; на мобильных — раскрытие по клику на заголовок */
.variants-section {
  background: var(--bg-secondary);
  padding: 14px 16px;
  border-top: 1px solid var(--border-color);
}

.variants-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  margin-bottom: 10px;
  cursor: default;
  -webkit-tap-highlight-color: transparent;
}

.variants-header.is-mobile {
  cursor: pointer;
  margin-bottom: 0;
}

.variants-header.is-mobile .chevron {
  width: 16px;
  height: 16px;
  margin-left: 6px;
  color: var(--text-muted);
  transition: transform 0.25s ease;
}

.variants-header.is-mobile.is-expanded .chevron {
  transform: rotate(180deg);
}

.variants-header.is-mobile.is-expanded {
  margin-bottom: 10px;
}

.variants-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.variant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: background 0.2s;
}

.model-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.model-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-color);
}

/* Анимация раскрытия только на мобильных */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
