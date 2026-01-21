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
      <div v-for="product in products" :key="product.id" class="product-card" :class="{ 'has-variants': product.variants }">
        <div class="product-main-content">
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
               <div class="badge" v-if="product.isNew">NEW</div>
            </div>
          </div>
          
          <div class="product-details">
            <div class="meta-row">
              <div class="view-count">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>{{ product.views || 0 }} просмотров</span>
              </div>
            </div>
            
            <div class="name-price">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="price-tag">{{ product.price }}</div>
            </div>
            
            <p v-if="product.description" class="product-desc">{{ product.description }}</p>

            <div class="action-row">
              <button class="btn-buy-now">
                <span>Купить</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
            </div>
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
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isModalOpen = ref(false)
const activeModalProductId = ref(null)

const openFullImage = (product) => {
  activeModalProductId.value = product.id
  isModalOpen.value = true
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

</script>

<style scoped>
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
  padding: 16px;
  gap: 16px;
}

.product-image-container {
  width: 120px;
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

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
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

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name-price {
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text-primary);
  line-height: 1.2;
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

.action-row {
  display: flex;
  gap: 8px;
}

.btn-buy-now {
  flex: 1;
  background: var(--accent-color);
  color: white;
  border: none;
  height: 40px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
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
