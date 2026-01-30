<template>
  <div class="main-page">
    <ProductSlider />

    <section class="categories-section">
      <h3 class="section-title">Категории</h3>
      <div class="categories-grid">
        <router-link
          v-for="category in categoryStore.categories"
          :key="category.id"
          :to="`/category/${category.id}`"
          class="category-card"
        >
          <div v-if="category.image_icon" class="category-icon" :class="{ 'category-icon--accent': category.isAccent }">
            <img :src="categoryImage(category)" :alt="category.image_icon">
          </div>
          <span class="category-name">{{ category.name }}</span>

        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import {  onMounted } from 'vue'
import ProductSlider from '@/components/main/ProductSlider.vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

onMounted(async () => {await categoryStore.fetchCategories(); console.log('categories', categoryStore.categories)})


const categoryImage = (category) => {
  return new URL(`../assets/categories/${category.image_icon}`, import.meta.url).href
}

</script>




<style scoped>
/* Контейнер главной: мобильный по умолчанию, на ПК — на всю ширину #app */
.main-page {
  width: 100%;
  min-height: 100%;
  background-color: var(--bg-secondary);
  transition: background-color 0.3s;
}

.categories-section {
  padding: 4px 12px 24px;
  max-width: 100%;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  transition: color 0.3s;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 6px;
  background-color: var(--bg-card);
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px var(--shadow-strong);
}

.category-card:active {
  transform: translateY(-1px) scale(0.98);
}

.category-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--category-icon-border);
  background-color: var(--bg-card);
  color: var(--text-primary);
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

.category-icon--accent {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.category-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s;
}

/* Very small screens */
@media (max-width: 320px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .category-card {
    padding: 12px 4px;
  }

  .category-icon {
    width: 48px;
    height: 48px;
  }

  .category-name {
    font-size: 11px;
  }
}

/* Small screens */
@media (max-width: 360px) {
  .categories-section {
    padding: 4px 8px 20px;
  }

  .section-title {
    font-size: 16px;
  }

  .categories-grid {
    gap: 8px;
  }

  .category-card {
    padding: 12px 4px;
  }

  .category-icon {
    width: 48px;
    height: 48px;
  }
}

/* Tablet and larger */
@media (min-width: 768px) {
  .categories-section {
    padding: 8px 24px 32px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .category-card {
    padding: 20px 12px;
    gap: 10px;
  }

  .category-icon {
    width: 64px;
    height: 64px;
  }

  .category-name {
    font-size: 14px;
  }
}

/* Desktop: 6 колонок, увеличенные отступы */
@media (min-width: 1024px) {
  .categories-section {
    padding: 12px 32px 40px;
  }

  .section-title {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .categories-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    max-width: 100%;
  }

  .category-card {
    padding: 24px 16px;
    gap: 12px;
    cursor: pointer;
  }

  .category-icon {
    width: 72px;
    height: 72px;
    border-radius: 16px;
  }

  .category-name {
    font-size: 15px;
  }
}

/* Широкий десктоп: мягкое ограничение ширины сетки категорий */
@media (min-width: 1280px) {
  .categories-section {
    padding: 16px 48px 48px;
  }

  .categories-grid {
    gap: 24px;
  }

  .category-card {
    padding: 28px 20px;
  }

  .category-icon {
    width: 80px;
    height: 80px;
  }

  .category-name {
    font-size: 16px;
  }
}
</style>
