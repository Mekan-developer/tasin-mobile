import { defineStore } from 'pinia'
import { categoryService } from '@/services/categoryService'

export const useCategoryStore = defineStore('category', {

  state:() => ({
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const response = await categoryService.getCategories()
        this.categories = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
