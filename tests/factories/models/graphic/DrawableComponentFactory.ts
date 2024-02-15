import { Factory } from 'fishery' 
import { DrawableComponent } from '@/models/graphic/DrawableComponent'
import componentFactory from '../component/ComponentFactory'

const drawableComponentFactory = Factory.define<DrawableComponent>(({params, associations}) => {

  const position = params.position as Position
  const size = params.size as Size
  const {component = componentFactory.build()} = associations

  return new DrawableComponent(component, position, size)
})

export default drawableComponentFactory
