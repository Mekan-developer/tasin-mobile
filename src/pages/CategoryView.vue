<template>
  <div class="category-page">
    <HeaderItem :categoryName="categoryName" :productCount="products.length" />

    <div class="products-list">
      <div v-for="product in products" :key="product.id" :id="`product-${product.id}`" class="product-card">
        <div class="product-main-content">
          <h3 class="product-name">{{ product.name }}</h3>

          <div class="product-image-container">
            <SwaggerItem
              :images="product.images"
              :activeImage="product.activeImage || 0"
              :productName="product.name"
              :productColor="product.color"
              :resolve-image-path="resolveImagePath"
              @update:activeImage="(idx) => product.activeImage = idx"
              @openImage="openFullImage(product)"
            />
          </div>

          <LinksItem
            :productId="product.id"
            :productName="product.name"
            :productDescription="product.description"
            :viewCount="product.views"
            :isInCart="isInCart(product.id)"
            :cartQuantity="getCartQuantity(product.id)"
            @toggleCart="toggleCart(product)"
            @share="shareProduct(product)"
            @copyLink="copyProductLink(product)"
          />
        </div>

        <VariantsItem :variants="product.variants" />
      </div>
    </div>

    <ImageModal
      v-model="isModalOpen"
      :product="currentModalProduct"
      :resolve-image-path="resolveImagePath"
      @update:active-image="(idx) => {
      const p = currentCategoryProducts.find(pr => pr.id === activeModalProductId)
      if (p) p.activeImage = idx
      }"
      />

    <!-- Toast Notification Component -->
    <ToastItem
      :message="toastMessage"
      :type="toastType"
      @close="handleToastClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import HeaderItem from '@/components/items/HeaderItem.vue'
import SwaggerItem from '@/components/items/SwaggerItem.vue'
import LinksItem from '@/components/items/LinksItem.vue'
import VariantsItem from '@/components/items/VariantsItem.vue'
import ToastItem from '@/components/items/ToastItem.vue'
import ImageModal from '@/components/items/ImageModal.vue'


const toastMessage = ref('')
const toastType = ref('success')

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
}

const handleToastClose = () => {
  toastMessage.value = ''
}

const currentModalProduct = computed(() =>
  currentCategoryProducts.value.find(p => p.id === activeModalProductId.value) ?? null
)

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


const copyProductLink = async (product) => {
  const productUrl = `${window.location.origin}${route.path}#product-${product.id}`

  try {
    await navigator.clipboard.writeText(productUrl)
    showToast('Ссылка скопирована!', 'success')
  } catch (e) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = productUrl
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    console.log(e)
    try {
      document.execCommand('copy')
      showToast('Ссылка скопирована!', 'success')
    } catch (e) {
      console.error('Failed to copy:', e)
    }
    document.body.removeChild(textArea)
  }
}

const scrollToHash = (hash) => {
  if (!hash) return

  const cleanHash = hash.startsWith('#') ? hash : `#${hash}`

  const tryScroll = (attempts = 0) => {
    if (attempts > 15) {
      console.warn('Failed to find element:', cleanHash)
      return
    }

    const productElement = document.querySelector(cleanHash)
    if (productElement) {
      setTimeout(() => {
        const headerOffset = 100
        const elementPosition = productElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        productElement.style.transition = 'box-shadow 0.3s'
        productElement.style.boxShadow = '0 0 0 4px rgba(33, 150, 243, 0.3)'
        setTimeout(() => {
          productElement.style.boxShadow = ''
        }, 2000)
      }, 150)
    } else {
      setTimeout(() => tryScroll(attempts + 1), 300)
    }
  }

  tryScroll()
}

const handleHashChange = () => {
  const hash = window.location.hash || route.hash
  if (hash) {
    nextTick(() => {
      scrollToHash(hash)
    })
  }
}

watch(() => route.hash, (newHash) => {
  if (newHash) {
    nextTick(() => {
      scrollToHash(newHash)
    })
  }
})

watch(() => window.location.hash, (newHash) => {
  if (newHash) {
    nextTick(() => {
      scrollToHash(newHash)
    })
  }
}, { immediate: true })

onMounted(() => {
  const hash = window.location.hash || route.hash
  if (hash) {
    nextTick(() => {
      scrollToHash(hash)
    })

    setTimeout(() => {
      scrollToHash(hash)
    }, 800)
  }

  window.addEventListener('hashchange', handleHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

// Mock Data
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
      images: [],
      views: 432
    }
  ],
  'smartphones': [
      { id: 201, name: 'iPhone 15 Pro', price: '999$', color: '#222', images: [], views: 890 }
  ]
})

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

const resolveImagePath = (path) => {
  if (!path) return ''
  if (path.startsWith('@/')) {
    const name = path.split('/').pop()
    return new URL(`../assets/img/${name}`, import.meta.url).href
  }
  return path
}

const products = computed(() => {
  return allProducts[categoryId.value] || []
})

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
      await navigator.clipboard.writeText(window.location.href)
      showToast('Ссылка скопирована в буфер обмена', 'success')
    }
  } catch (err) {
    console.log('Error sharing:', err)
  }
}
</script>

<style scoped>

.category-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
}

.products-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
}

.product-card {
  background: var(--bg-card);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
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

.product-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.3;
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
  width: 20px;
  height: 20px;
}

/* Responsive */
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
