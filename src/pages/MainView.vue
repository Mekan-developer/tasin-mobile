<template>
  <div class="main-page">
    <ProductSlider />

    <section class="categories-section">
      <h3 class="section-title">Категории</h3>
      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.link"
          class="category-card"
        >
          <div class="category-icon" :class="{ 'category-icon--accent': category.isAccent }">
            <component :is="category.icon" />
          </div>
          <span class="category-name">{{ category.name }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from 'vue'
import ProductSlider from '@/components/main/ProductSlider.vue'

const categories = [
  {
    id: 1,
    name: 'Смарт-фоны',
    link: '/category/smartphones',
    isAccent: true,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' }),
      h('line', { x1: '12', y1: '18', x2: '12.01', y2: '18' })
    ])
  },
  {
    id: 2,
    name: 'Планшеты',
    link: '/category/tablets',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '4', y: '2', width: '16', height: '20', rx: '2', ry: '2' }),
      h('line', { x1: '12', y1: '18', x2: '12.01', y2: '18' })
    ])
  },
  {
    id: 3,
    name: 'Часы',
    link: '/category/watches',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '7' }),
      h('polyline', { points: '12 9 12 12 13.5 13.5' }),
      h('path', { d: 'M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83' })
    ])
  },
  {
    id: 4,
    name: 'Наушники',
    link: '/category/headphones',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M3 18v-6a9 9 0 0 1 18 0v6' }),
      h('path', { d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' })
    ])
  },
  {
    id: 5,
    name: 'Кабели',
    link: '/category/cables',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1' }),
      h('path', { d: 'M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9' }),
      h('line', { x1: '17', y1: '21', x2: '7', y2: '21' })
    ])
  },
  {
    id: 7,
    name: 'Чехлы',
    link: '/category/cases',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' }),
      h('path', { d: 'M9 6h6' }),
      h('path', { d: 'M9 10h6' }),
      h('path', { d: 'M12 18h.01' })
    ])
  },
  {
    id: 6,
    name: 'Батареи',
    link: '/category/batteries',
    isAccent: false,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '26',
      height: '26',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '1', y: '6', width: '18', height: '12', rx: '2', ry: '2' }),
      h('line', { x1: '23', y1: '13', x2: '23', y2: '11' })
    ])
  }
]
</script>

<style scoped>
.main-page {
  min-height: 100%;
  background-color: var(--bg-secondary);
  transition: background-color 0.3s;
}

.categories-section {
  padding: 4px 12px 24px;
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

/* Desktop */
@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
