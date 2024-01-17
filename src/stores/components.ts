import { defineStore } from 'pinia'
import { Component } from '@/models/Component'


type ComponentStoreState = {
  rootComponent?: Component
  curentComponent?: Component
  components: { [key: string]: Component }
}


export const useComponentsStore = defineStore('components', {
  state: (): ComponentStoreState => {
    return {
      components: {},
      rootComponent: undefined,
      curentComponent: undefined,
    }
  },
  getters: {
    getComponent(state) {
      return state.curentComponent
    }
  },
  actions: {
    setComponent(id: string) {
      const component: Component = this.components[id]

      if (component !== undefined) {
        if (this.rootComponent === undefined) {
          this.rootComponent = component
        }
        this.curentComponent = component
      } else {
        throw new Error('Invalid Component ID')
      }
    },
    addComponent(id: string, component: Component) {
      this.components[id] = component
    }
  }
})
