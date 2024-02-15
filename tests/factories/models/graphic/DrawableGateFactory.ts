import { Factory } from 'fishery' 
import { DrawableGate } from '@/models/graphic/DrawableGate'
import iOGateFactory from '../io_gate/IOGateFactory'

const drawableGateFactory = Factory.define<DrawableGate>(({params, associations}) => {

  const position = params.position as Position
  const size = params.size as Size
  const {gate = iOGateFactory.build()} = associations

  return new DrawableGate(gate, position, size)
})

export default drawableGateFactory
