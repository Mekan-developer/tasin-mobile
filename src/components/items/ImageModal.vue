<template>
  <Transition name="fade">
    <div v-if="modelValue" class="image-modal" @click="$emit('update:modelValue', false)">
      <div
        class="modal-content"
        @click.stop
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <img
          v-if="product"
          :src="resolveImagePath(product.images[product.activeImage])"
          class="modal-img"
          alt=""
        />

        <div v-if="product && product.images.length > 1" class="modal-indicators">
          <div
            v-for="(_, i) in product.images"
            :key="i"
            class="modal-dot"
            :class="{ active: product.activeImage === i }"
          />
        </div>

        <button class="close-modal" @click="$emit('update:modelValue', false)" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

/** Fullscreen image modal with swipe and indicators */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  product: { type: Object, default: null },       // { images: string[], activeImage: number }
  resolveImagePath: { type: Function, default: (p) => p }
})

const emit = defineEmits(['update:modelValue', 'update:activeImage'])

const touchStart = ref(0)
const touchY = ref(0)

function handleTouchStart(e) {
  touchStart.value = e.touches[0].clientX
  touchY.value = e.touches[0].clientY
}

function handleTouchEnd(e) {
  if (!props.product || props.product.images.length <= 1) return
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const diffX = touchStart.value - touchEndX
  const diffY = touchY.value - touchEndY

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    const len = props.product.images.length
    const next = diffX > 0
      ? (props.product.activeImage + 1) % len
      : (props.product.activeImage - 1 + len) % len
    emit('update:activeImage', next)
  }
}
</script>

<style scoped>
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img {
  max-width: 95%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.modal-indicators {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.modal-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}

.modal-dot.active {
  background: white;
  transform: scale(1.2);
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-modal:active {
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
