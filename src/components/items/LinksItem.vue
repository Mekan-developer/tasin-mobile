<template>
  <div class="action-icons">
    <button class="icon-btn view-btn" :title="`${viewCount || 0} просмотров`">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>

    <button class="icon-btn share-btn" @click="shareProduct" title="Поделиться">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
    </button>

    <button class="icon-btn copy-link-btn" @click="copyProductLink" title="Копировать ссылку">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </button>

    <button
      class="icon-btn cart-btn"
      :class="{ 'in-cart': isInCart }"
      @click="toggleCart"
      :title="isInCart ? 'Удалить из корзины' : 'Добавить в корзину'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        <line v-if="!isInCart" x1="12" y1="6" x2="12" y2="12"/>
        <line v-if="!isInCart" x1="9" y1="9" x2="15" y2="9"/>
      </svg>
      <span v-if="cartQuantity > 0" class="cart-quantity-badge">
        {{ cartQuantity }}
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  productId: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    default: ''
  },
  viewCount: {
    type: Number,
    default: 0
  },
  isInCart: {
    type: Boolean,
    required: true
  },
  cartQuantity: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['toggleCart', 'share', 'copyLink'])

const toggleCart = () => {
  emit('toggleCart')
}

const shareProduct = async () => {
  emit('share')
}

const copyProductLink = async () => {
  emit('copyLink')
}
</script>

<style scoped>
.action-icons {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 8px 0;
}

.icon-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.icon-btn:active {
  transform: scale(0.95);
  background: var(--hover-bg);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.cart-btn {
  position: relative;
  transition: all 0.3s;
}

.cart-btn.in-cart {
  color: var(--accent-color);
  background: rgba(33, 150, 243, 0.1);
}

.cart-quantity-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--accent-color);
  color: white;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.4);
}
</style>