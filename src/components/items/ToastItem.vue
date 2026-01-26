<template>
  <Transition name="toast">
    <div v-if="message" class="toast" :class="`toast-${type}`">
      <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'info', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const emit = defineEmits(['close'])

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 14px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px var(--shadow-strong);
  z-index: 2000;
  border: 1px solid var(--border-color);
  font-weight: 500;
  font-size: 14px;
  max-width: 90%;
  width: fit-content;
}

.toast-success {
  border-left: 4px solid #4caf50;
}

.toast-success svg {
  color: #4caf50;
}

.toast-info {
  border-left: 4px solid #2196f3;
}

.toast-info svg {
  color: #2196f3;
}

.toast-error {
  border-left: 4px solid #f44336;
}

.toast-error svg {
  color: #f44336;
}

.toast svg {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>