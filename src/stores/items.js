import { defineStore } from 'pinia'
import axios from 'axios'
const API_BASE = 'http://localhost:3000'

export const useItemsStore = defineStore('items', {
  state:() => ({
    items: [],
  }),

  actions: {
    async fetchItems() {
      const response = await axios.get(`${API_BASE}/items`)
      this.items = response.data
    },

     /** Загружает товары по category_id, нормализует images и activeImage */
    async fetchItemsByCategory(categoryId) {
      if (!categoryId) {
        this.items = []
        return
      }
      try {
        const { data } = await axios.get(`${API_BASE}/items?category_id=${categoryId}`)
        const list = Array.isArray(data) ? data : []
        this.items = list.map((p) => ({
          ...p,
          images: p.images ?? [],
          activeImage: p.activeImage ?? 0,
        }))
      } catch (e) {
        this.items = []
      }
    },
  }
})
