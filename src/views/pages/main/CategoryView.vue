<template>
  <div class="category-page">
    <header class="category-header">
      <button class="back-button" @click="$router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <div class="header-text">
        <h1 class="page-title">{{ categoryName }}</h1>
        <span class="product-count">{{ products.length }} товаров</span>
      </div>
    </header>

    <div class="products-list">
      <div v-for="product in products" :key="product.id" :id="`product-${product.id}`" class="product-card" :class="{ 'has-variants': product.variants }">
        <div class="product-main-content">
          <!-- Name at top -->
          <h3 class="product-name">{{ product.name }}</h3>

          <!-- Image below name -->
          <div class="product-image-container">
            <div class="product-image-wrapper" :style="{ background: `linear-gradient(135deg, ${product.color || '#333'}, #1a1a1a)` }">
              <div v-if="product.images && product.images.length > 0"
                  class="image-gallery"
                  @touchstart="handleTouchStart"
                  @touchend="(e) => handleTouchEnd(e, product)"
              >
                <img
                  :src="resolveImagePath(product.images[product.activeImage || 0])"
                  :alt="product.name"
                  class="product-img"
                  @click="openFullImage(product)"
                />
                <div v-if="product.images.length > 1" class="image-indicators">
                  <div
                    v-for="(_, i) in product.images"
                    :key="i"
                    class="image-dot-wrapper"
                    @click.stop="product.activeImage = i"
                  >
                    <div class="image-dot" :class="{ active: (product.activeImage || 0) === i }"></div>
                  </div>
                </div>
              </div>
              <div v-else class="placeholder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            </div>
          </div>

          <!-- View and Share icons below image -->
          <div class="action-icons">
            <button class="icon-btn view-btn" :title="`${product.views || 0} просмотров`">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button class="icon-btn share-btn" @click="shareProduct(product)" title="Поделиться">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>

            <button class="icon-btn copy-link-btn" @click="copyProductLink(product)" title="Копировать ссылку">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>

            <!-- <button
              v-if="!isInCart(product.id)"
              class="icon-btn add-cart-btn"
              @click="addToCart(product)"
              title="Добавить в корзину"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                <line x1="12" y1="6" x2="12" y2="12"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
              </svg>
            </button>
            <button
              v-else
              class="icon-btn remove-cart-btn"
              @click="removeFromCart(product.id)"
              title="Удалить из корзины"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
              </svg>
            </button> -->

            <!-- Cart button with quantity -->
<button
  class="icon-btn cart-btn"
  :class="{ 'in-cart': isInCart(product.id) }"
  @click="toggleCart(product)"
  :title="isInCart(product.id) ? 'Удалить из корзины' : 'Добавить в корзину'"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <line v-if="!isInCart(product.id)" x1="12" y1="6" x2="12" y2="12"/>
    <line v-if="!isInCart(product.id)" x1="9" y1="9" x2="15" y2="9"/>
  </svg>
  <span v-if="getCartQuantity(product.id) > 0" class="cart-quantity-badge">
    {{ getCartQuantity(product.id) }}
  </span>
</button>
          </div>


        </div>

        <!-- Variants Section - More interactive -->
        <div v-if="product.variants" class="variants-section">
          <div class="variants-header">Доступные модели:</div>
          <div class="variants-grid">
            <div v-for="(variant, idx) in product.variants" :key="idx" class="variant-item">
              <span class="model-name">{{ variant.model }}</span>
              <span class="model-price">{{ variant.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <Transition name="fade">
      <div v-if="isModalOpen" class="image-modal" @click="isModalOpen = false">
        <div class="modal-content" @click.stop
             @touchstart="handleTouchStart"
             @touchend="(e) => handleModalTouchEnd(e)"
        >
          <img :src="resolveImagePath(currentCategoryProducts.find(p => p.id === activeModalProductId).images[currentCategoryProducts.find(p => p.id === activeModalProductId).activeImage])"
               class="modal-img" />

          <div v-if="currentCategoryProducts.find(p => p.id === activeModalProductId).images.length > 1" class="modal-indicators">
             <div v-for="(_, i) in currentCategoryProducts.find(p => p.id === activeModalProductId).images"
                  :key="i"
                  class="modal-dot"
                  :class="{ active: currentCategoryProducts.find(p => p.id === activeModalProductId).activeImage === i }"
             ></div>
          </div>

          <button class="close-modal" @click="isModalOpen = false">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

    </Transition>
  </div>
        <!-- Toast Notification -->
<Transition name="toast">
  <div v-if="toastMessage" class="toast" :class="`toast-${toastType}`">
    <svg v-if="toastType === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
    <span>{{ toastMessage }}</span>
  </div>
</Transition>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const isInCart = (productId) => cartStore.isInCart(productId)
const addToCart = (product) => cartStore.addToCart(product)
const removeFromCart = (productId) => cartStore.removeFromCart(productId)

const route = useRoute()
const isModalOpen = ref(false)
const activeModalProductId = ref(null)

const openFullImage = (product) => {
  activeModalProductId.value = product.id
  isModalOpen.value = true
}

const getCartQuantity = (productId) => cartStore.getItemQuantity(productId)

const toggleCart = (product) => {
  if (isInCart(product.id)) {
    removeFromCart(product.id)
    showToast('Товар удален из корзины', 'info')
  } else {
    addToCart(product)
    showToast('Товар добавлен в корзину!', 'success')
  }
}

// Toast notification
const toastMessage = ref('')
const toastType = ref('success')
const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 2000)
}

const touchStart = ref(0)
const touchY = ref(0)

const handleTouchStart = (e) => {
  touchStart.value = e.touches[0].clientX
  touchY.value = e.touches[0].clientY
}

const handleTouchEnd = (e, product) => {
  const touchEnd = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchStart.value - touchEnd
  const diffY = touchY.value - touchEndY

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX > 0) {
      product.activeImage = (product.activeImage + 1) % product.images.length
    } else {
      product.activeImage = (product.activeImage - 1 + product.images.length) % product.images.length
    }
  }
}

const handleModalTouchEnd = (e) => {
  const product = currentCategoryProducts.value.find(p => p.id === activeModalProductId.value)
  if (!product) return

  const touchEnd = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchStart.value - touchEnd
  const diffY = touchY.value - touchEndY

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX > 0) {
      product.activeImage = (product.activeImage + 1) % product.images.length
    } else {
      product.activeImage = (product.activeImage - 1 + product.images.length) % product.images.length
    }
  }
}

const copyProductLink = async (product) => {
  // Используем полный URL с hash
  const productUrl = `${window.location.origin}${route.path}#product-${product.id}`

  try {
    await navigator.clipboard.writeText(productUrl)
    alert('Ссылка скопирована!')
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = productUrl
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      alert('Ссылка скопирована!')
    } catch (e) {
      console.error('Failed to copy:', e)
    }
    document.body.removeChild(textArea)
  }
}

// Function to scroll to product by hash
const scrollToHash = (hash) => {
  if (!hash) return

  // Remove # if present
  const cleanHash = hash.startsWith('#') ? hash : `#${hash}`

  // Try multiple times in case DOM is not ready
  const tryScroll = (attempts = 0) => {
    if (attempts > 15) {
      console.warn('Failed to find element:', cleanHash)
      return
    }

    const productElement = document.querySelector(cleanHash)
    if (productElement) {
      // Wait a bit more for layout to settle
      setTimeout(() => {
        const headerOffset = 100 // Account for sticky header
        const elementPosition = productElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // Add highlight effect
        productElement.style.transition = 'box-shadow 0.3s'
        productElement.style.boxShadow = '0 0 0 4px rgba(33, 150, 243, 0.3)'
        setTimeout(() => {
          productElement.style.boxShadow = ''
        }, 2000)
      }, 150)
    } else {
      // Retry after a short delay
      setTimeout(() => tryScroll(attempts + 1), 300)
    }
  }

  tryScroll()
}

// Watch for hash changes in URL (both route.hash and window.location.hash)
const handleHashChange = () => {
  const hash = window.location.hash || route.hash
  if (hash) {
    nextTick(() => {
      scrollToHash(hash)
    })
  }
}

// Watch for route hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    nextTick(() => {
      scrollToHash(newHash)
    })
  }
})

// Watch for window location hash changes
watch(() => window.location.hash, (newHash) => {
  if (newHash) {
    nextTick(() => {
      scrollToHash(newHash)
    })
  }
}, { immediate: true })


// Initial scroll on mount - check both route.hash and window.location.hash
onMounted(() => {
  // Check hash immediately
  const hash = window.location.hash || route.hash
  if (hash) {
    // Try immediately
    nextTick(() => {
      scrollToHash(hash)
    })

    // Also try after a delay to ensure DOM is ready
    setTimeout(() => {
      scrollToHash(hash)
    }, 800)
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
})


// Cleanup
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

// Mock Data - MADE REACTIVE
const allProducts = reactive({
  'cases': [
    {
      id: 101,
      activeImage: 0,
      name: '17 Pro Style Premium Case',
      description: 'Креативный дизайн с защитой камеры и поддержкой аксессуаров. Доступен в нескольких цветах.',
      price: '3,5$',
      color: '#4a4e69',
      images: [
        '@/assets/img/iphone_case_mockup.jpeg',
        '@/assets/img/iphone_case_silver.jpeg',
        '@/assets/img/iphone_case_deep_purple.jpeg'
      ],
      views: 1254,
      isNew: true,
      variants: [
        { model: 'iPhone 16 Pro Max', price: '3,5$' },
        { model: 'iPhone 16 Pro', price: '3,5$' },
        { model: 'iPhone 15 Pro Max', price: '3,5$' },
        { model: 'iPhone 15 Pro', price: '3,5$' },
        { model: 'iPhone 14 Pro Max', price: '3,5$' },
        { model: 'iPhone 14 Pro', price: '3,5$' },
        { model: 'iPhone 13 Pro Max', price: '3,5$' },
        { model: 'iPhone 13 Pro', price: '3,5$' },
      ]
    },
    {
      id: 102,
      name: 'Crystal Clear MagSafe',
      description: 'Идеально прозрачный чехол с усиленными магнитами.',
      price: '5,0$',
      color: '#a2d2ff',
      images: [], // No images yet
      views: 432
    }
  ],
  'smartphones': [
      { id: 201, name: 'iPhone 15 Pro', price: '999$', color: '#222', images: [], views: 890 }
  ]
})

// Rename for clarity in current file
const currentCategoryProducts = computed(() => {
  return allProducts[categoryId.value] || []
})

const categoryId = computed(() => route.params.id)

const categoryName = computed(() => {
  const map = {
    'smartphones': 'Смартфоны',
    'cases': 'Чехлы',
    'tablets': 'Планшеты',
    'watches': 'Часы',
    'headphones': 'Наушники',
    'cables': 'Кабели',
    'batteries': 'Батареи'
  }
  return map[categoryId.value] || 'Категория'
})

// Vite magic for dynamic asset paths
const resolveImagePath = (path) => {
  if (!path) return ''
  if (path.startsWith('@/')) {
    const name = path.split('/').pop()
    return new URL(`../../../assets/img/${name}`, import.meta.url).href
  }
  return path
}

const products = computed(() => {
  return allProducts[categoryId.value] || []
})


// Watch for products to be loaded
watch(products, () => {
  if (products.value.length > 0) {
    nextTick(() => {
      const hash = window.location.hash
      if (hash) {
        scrollToHash(hash)
      }
    })
  }
}, { immediate: true })

const shareProduct = async (product) => {
  const shareData = {
    title: product.name,
    text: product.description || product.name,
    url: window.location.href
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована в буфер обмена')
    }
  } catch (err) {
    console.log('Error sharing:', err)
  }
}

</script>

<style scoped>

.add-cart-btn {
  color: var(--accent-color);
}

.add-cart-btn:active {
  background: var(--accent-color);
  color: white;
}

.remove-cart-btn {
  color: #f44336;
}

.remove-cart-btn:active {
  background: #f44336;
  color: white;
}

.category-page {
  display: flex;
  flex-direction: column;
  height: 100%; /* Relative to .layout-main */
  background-color: var(--bg-primary);
}

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

.products-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px; /* Space before footer */
}

.product-card {
  background: var(--bg-card);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
}

.product-main-content {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
}

.product-image-container {
  width: 100%;
  flex-shrink: 0;
}


.product-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
}

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
}

.icon-btn:active {
  transform: scale(0.95);
  background: var(--hover-bg);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  image-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.image-gallery {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-indicators {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
  padding: 4px;
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
  backdrop-filter: blur(4px);
}

.image-dot-wrapper {
  padding: 6px 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
}

.image-dot.active {
  background: white;
  width: 10px;
  border-radius: 3px;
}

.placeholder-icon {
  opacity: 0.5;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-secondary);
  opacity: 0.8;
}

.small-badge {
  background: var(--accent-color);
  color: white;
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Lightbox Modal Styles */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Hide product-details on mobile */
.product-details {
  display: none;
}

/* Tablet and desktop - show horizontal layout */
@media (min-width: 768px) {
  .product-main-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .product-name {
    display: none; /* Hide name on desktop as it's in product-details */
  }

  .product-image-container {
    width: 200px;
  }

  .product-details {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .action-icons {
    justify-content: flex-start;
  }
}

.name-price {
  margin-bottom: 8px;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.3;
}

.price-tag {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent-color);
}

.product-desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Fixed lint warning */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-wishlist {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
}

/* Variants Section */
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

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px var(--shadow-strong);
  z-index: 2000;
  border: 1px solid var(--border-color);
}

.toast-success {
  border-left: 4px solid #4caf50;
}

.toast-info {
  border-left: 4px solid #2196f3;
}

.toast svg {
  flex-shrink: 0;
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

/* Responsive adjustments */
@media (min-width: 768px) {
  .products-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
