import { Factory } from 'fishery'
import { Component } from '@/models/component/Component'

class ConcreteComponent extends Component {}

const componentFactory = Factory.define<ConcreteComponent>(({params, associations}) => {
  const { name = "Dummy Component" } = params
  const { parent } = associations


  return new ConcreteComponent(name, parent)
})

export default componentFactory
