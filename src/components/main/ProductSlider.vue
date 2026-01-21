<template>
  <div class="slider-container">
    <div class="slider-wrapper">
      <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(slide, index) in slides" :key="index" class="slide" :style="{ backgroundColor: slide.bgColor }">
          <div class="slide-content">
            <div class="slide-text">
              <span class="badge">{{ slide.badge }}</span>
              <h2 class="title">{{ slide.title }}</h2>
              <p class="description">{{ slide.description }}</p>
              <button class="btn-more">{{ slide.buttonText }}</button>
            </div>
            <div class="slide-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="slider-indicators">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          class="indicator"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let intervalId = null

const slides = [
  {
    badge: 'НОВИНКА 2024',
    title: 'Samsung Galaxy S24',
    description: 'AI-функции для повседневной жизни.',
    buttonText: 'Подробнее',
    bgColor: '#22c55e'
  },
  {
    badge: 'АКЦИЯ',
    title: 'iPhone 15 Pro',
    description: 'Титановый корпус и мощный чип.',
    buttonText: 'Купить сейчас',
    bgColor: '#3b82f6'
  },
  {
    badge: 'ХИТ ПРОДАЖ',
    title: 'Xiaomi 14',
    description: 'Флагманская камера Leica.',
    buttonText: 'Узнать больше',
    bgColor: '#f97316'
  }
]

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const startAutoplay = () => {
  intervalId = setInterval(nextSlide, 5000)
}

const resetAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.slider-container {
  width: 100%;
  padding: 12px;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 16px var(--shadow-color);
}

.slides {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  min-width: 100%;
  padding: 24px 20px;
  border-radius: 16px;
  position: relative;
}

.slide-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.slide-text {
  flex: 1;
  color: white;
}

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
  opacity: 0.95;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 6px 0;
  line-height: 1.2;
}

.description {
  font-size: 13px;
  margin: 10px 0 16px;
  opacity: 0.9;
  line-height: 1.4;
}

.btn-more {
  background-color: white;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-more:active {
  transform: translateY(0);
}

.slide-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.slide-arrow:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.slide-arrow:active {
  transform: scale(0.95);
}

.slider-indicators {
  position: absolute;
  bottom: 14px;
  left: 20px;
  display: flex;
  gap: 6px;
}

.indicator {
  width: 20px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background-color: white;
  width: 28px;
}

.indicator:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

/* Small screens */
@media (max-width: 360px) {
  .slider-container {
    padding: 8px;
  }
  
  .slide {
    padding: 20px 16px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .description {
    font-size: 12px;
    margin: 8px 0 12px;
  }
  
  .btn-more {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .slide-arrow {
    width: 32px;
    height: 32px;
  }
  
  .slide-arrow svg {
    width: 18px;
    height: 18px;
  }
}

/* Tablet and larger */
@media (min-width: 768px) {
  .slider-container {
    padding: 16px 24px;
  }
  
  .slide {
    padding: 32px 28px;
  }
  
  .badge {
    font-size: 11px;
  }
  
  .title {
    font-size: 32px;
  }
  
  .description {
    font-size: 15px;
    margin: 12px 0 20px;
  }
  
  .btn-more {
    padding: 12px 28px;
    font-size: 14px;
  }
  
  .slide-arrow {
    width: 44px;
    height: 44px;
  }
  
  .slider-indicators {
    bottom: 18px;
    left: 28px;
    gap: 8px;
  }
  
  .indicator {
    width: 28px;
    height: 4px;
  }
  
  .indicator.active {
    width: 36px;
  }
}
</style>
