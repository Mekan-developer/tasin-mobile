<template>
  <div class="product-image-wrapper" :style="{ background: `linear-gradient(135deg, ${productColor || '#333'}, #1a1a1a)` }">
    <div v-if="images && images.length > 0"
        class="image-gallery"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @click="openFullImage"
    >
      <img
        :src="resolveImagePath(images[activeImage || 0])"
        :alt="productName"
        class="product-img"
      />
      <div v-if="images.length > 1" class="image-indicators">
        <div
          v-for="(_, i) in images"
          :key="i"
          class="image-dot-wrapper"
          @click.stop="updateActiveImage(i)"
        >
          <div class="image-dot" :class="{ active: (activeImage || 0) === i }"></div>
        </div>
      </div>
    </div>
    <div v-else class="placeholder-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  activeImage: {
    type: Number,
    default: 0
  },
  productName: {
    type: String,
    required: true
  },
  productColor: {
    type: String,
    default: '#333'
  },
  resolveImagePath: {
    type: Function,
    default: (p) => p || ''
  },
})

const emit = defineEmits(['update:activeImage', 'openImage'])

const touchStart = ref(0)
const touchY = ref(0)

const handleTouchStart = (e) => {
  touchStart.value = e.touches[0].clientX
  touchY.value = e.touches[0].clientY
}

const handleTouchEnd = (e) => {
  const touchEnd = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const diffX = touchStart.value - touchEnd
  const diffY = touchY.value - touchEndY

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX > 0) {
      updateActiveImage((props.activeImage + 1) % props.images.length)
    } else {
      updateActiveImage((props.activeImage - 1 + props.images.length) % props.images.length)
    }
  }
}

const updateActiveImage = (index) => {
  emit('update:activeImage', index)
}

const openFullImage = () => {
  emit('openImage')
}

</script>

<style scoped>
/* Минимальная галерея: квадрат, лёгкий фон, тонкие индикаторы */
.product-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-secondary);
}

.image-gallery {
  position: relative;
  width: 100%;
  height: 100%;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.25s ease;
}

.image-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 20px;
}

.image-dot-wrapper {
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.image-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: width 0.2s, background 0.2s;
}

.image-dot.active {
  background: #fff;
  width: 10px;
  border-radius: 2px;
}

.placeholder-icon {
  opacity: 0.4;
}
</style>
