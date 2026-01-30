import { defineStore } from 'pinia'
import axios from 'axios'
const API_BASE = 'http://192.168.50.72:3000'

export const useProductsStore = defineStore('products', {
  state:() => ({
    products: [],
  }),

  actions: {
    async fetchProducts() {
      const response = await axios.get(`${API_BASE}/products`)
      this.products = response.data
    },

     /** Загружает товары по category_id, нормализует images и activeImage */
    async fetchProductsByCategory(categoryId) {
      if (!categoryId) {
        this.products = []
        return
      }
      try {
        const { data } = await axios.get(`${API_BASE}/products?category_id=${categoryId}`)
        const list = Array.isArray(data) ? data : []
        this.products = list.map((p) => ({
          ...p,
          images: p.images ?? [],
          activeImage: p.activeImage ?? 0,
        }))
      } catch (e) {
        this.products = []
      }
    },
  }
})
