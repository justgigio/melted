import { Factory } from 'fishery'
import { Component } from '@/models/component/Component'

class ConcreteComponent extends Component {}

const componentFactory = Factory.define<ConcreteComponent>(({params}) => {
  const { name = "Dummy Component", parent } = params

  if (parent !== undefined) {
    return new ConcreteComponent(name, parent as Component)
  }

  return new ConcreteComponent(name)

})

export default componentFactory
