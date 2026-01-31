<template>
  <div class="category-page">
    <HeaderItem v-if="categoryName" :categoryName="categoryName" :productCount="products.length" />

    <div v-if="productsStore.loading">Загрузка...</div>
    <div v-else-if="productsStore.error">{{ productsStore.error }}</div>
    <div v-else class="products-list h-auto min-h-0" :class="{ 'any-variants-expanded': variantsExpandedCount > 0 }">
        <div v-for="product in products" :key="product.id" :id="`product-${product.id}`" class="product-card">
          <div class="product-main-content">
            <h3 class="product-name">{{ product.name }}</h3>

            <div class="product-image-container">
              <SwaggerItem
                :images="product.images"
                :activeImage="product.activeImage || 0"
                :productName="product.name"
                :productPrice="product.price"
                :resolve-image-path="resolveImagePath"
                @update:activeImage="(idx) => product.activeImage = idx"
                @openImage="openFullImage(product)"
              />
            </div>

            <LinksItem
              :productId="+product.id"
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

          <div v-if="product.description" class="product-description py-2 px-4 bg-white/5 border border-white/10 h-full">
            <p class="text-gray-300 leading-tight">
              {{ product.description }}
            </p>
          </div>

          <VariantsItem :variants="product.variants || []" @expanded-change="onVariantsExpandedChange" />
        </div>

    </div>

    <ImageModal
      v-model="isModalOpen"
      :product="currentModalProduct"
      :resolve-image-path="resolveImagePath"
      @update:active-image="(idx) => {
      const p = products.find(pr => pr.id === activeModalProductId)
      if (p) p.activeImage = idx
      }"
      />

    <!-- Toast Notification Component -->
    <NotificationView
      :message="toastMessage"
      :type="toastType"
      @close="handleToastClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import HeaderItem from '@/components/items/HeaderItem.vue'
import SwaggerItem from '@/components/items/SwaggerItem.vue'
import LinksItem from '@/components/items/LinksItem.vue'
import VariantsItem from '@/components/items/VariantsItem.vue'
import NotificationView from '@/components/common/NotificationView.vue'
import ImageModal from '@/components/common/ImageModal.vue'
import {useCategoryStore} from '@/stores/category'
import {useProductsStore} from '@/stores/product'


const productsStore = useProductsStore()
const products = computed(() => productsStore.products)

/** Количество карточек с раскрытым блоком «Доступные модели» — для выравнивания сетки */
const variantsExpandedCount = ref(0)
function onVariantsExpandedChange(expanded) {
  variantsExpandedCount.value = Math.max(0, variantsExpandedCount.value + (expanded ? 1 : -1))
}
watch(products, () => { variantsExpandedCount.value = 0 }, { deep: true })

onMounted(async () => {
  await loadCategoryNames()
  await productsStore.fetchProductsByCategory(categoryId.value)
})

const route = useRoute()
const categoryNames = ref([])
const categoryId = computed(() => route.params.id)
watch(categoryId, (id) => {
  productsStore.fetchProductsByCategory(id, true)
})


const categoryStore = useCategoryStore()
async function loadCategoryNames() {
  try {
    categoryNames.value = Array.isArray(categoryStore.categories) ? categoryStore.categories : []
  } catch (e) {
    categoryNames.value = []
  }
}

const categoryName = computed(() => {
  const list = categoryNames.value
  if (!Array.isArray(list)) return 'Категория'
  const c = list.find((cat) => String(cat.id) === String(categoryId.value))
  return c?.name ?? 'Категория'
})

// async function loadProducts() {
//   const id = categoryId.value
//   if(!id){
//     products.value = []
//     return
//   }
//   try {
//     const { data } = await axios.get(`${API_BASE}/products?category_id=${id}`)
//     const list = Array.isArray(data) ? data : []
//     // Нормализация: у каждого продукта есть images[] и activeImage
//     products.value = list.map((p) => ({
//       ...p,
//       images: p.images ?? [],
//       activeImage: p.activeImage ?? 0
//     }))
//   } catch (e) {
//     products.value = []
//   }
// }



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
  products.value.find(p => p.id === activeModalProductId.value) ?? null
)

const cartStore = useCartStore()
const isInCart = (productId) => cartStore.isInCart(productId)
const addToCart = (product) => cartStore.addToCart(product)
const removeFromCart = (productId) => cartStore.removeFromCart(productId)

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






/** Резолв пути картинки: имя файла из API → URL из assets/img */
const resolveImagePath = (path) => {
  if (!path) return ''
  const name = path.startsWith('@/') ? path.split('/').pop() : path
  try {
    return new URL(`../assets/img/${name}`, import.meta.url).href
  } catch {
    return path
  }
}

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

/* Страница категории: колонка на всю высоту, на ПК — ширина 100% */
.category-page {
  display: flex;
  flex-direction: column;
  width: 100%;

}

.products-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom:0;
  background-color: var(--bg-secondary);
}

.product-card {
  background: var(--bg-card);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: box-shadow 0.2s, transform 0.2s;
}

.product-main-content {
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0 12px;
  gap: 6px;
}

.product-image-container {
  width: 100%;
  flex-shrink: 0;
}

.product-name {
  font-size: var(--text-base);
  font-weight: 500;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.product-description p {
  font-size: var(--text-sm);
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

/* Планшет: сетка 2 колонки; когда все свёрнуты — равная высота ряда (stretch); при раскрытии одной — только она растёт */
@media (min-width: 768px) {
  .products-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 24px;
    padding-bottom: 48px;
    align-items: stretch;
  }

  .products-list.any-variants-expanded {
    align-items: start;
  }

  .product-main-content {
    padding: 14px 14px 0 14px;
    gap: 14px;
  }
}

/* Десктоп: 3 колонки; align-items: start уже задан в 768px */
@media (min-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    padding: 32px;
    padding-bottom: 56px;
  }

  .product-card {
    border-radius: 10px;
    cursor: default;
  }

  .product-card:hover {
    box-shadow: 0 8px 28px var(--shadow-strong);
  }

  .product-main-content {
    padding: 22px 22px 0 22px;
    gap: 16px;
  }
}

/* Широкий десктоп: 4 колонки */
@media (min-width: 1280px) {
  .products-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    padding: 40px 48px;
    padding-bottom: 64px;
  }

  .product-main-content {
    padding: 16px 16px 0 16px;
    gap: 18px;
  }
}
</style>
