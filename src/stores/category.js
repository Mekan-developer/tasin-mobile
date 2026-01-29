import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoryStore = defineStore('category', {

  state:() => ({
    categories: [],
  }),

  actions: {
    async fetchCategories() {
      const response = await axios.get('http://localhost:3000/categories')
      this.categories = response.data
    }
  }


})
