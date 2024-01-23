import { defineStore } from 'pinia'
import { Component } from '@/models/Component'


export const useComponentsStore = defineStore('components', {
  state: () => {
    return {
      components: {} as { [key: string]: Component },
    }
  },
  getters: {},
  actions: {
    getComponentById(id: string): Component | undefined {
      return this.components[id]
    },
    addComponent(id: string, component: Component) {
      this.components[id] = component
    }
  }
})
