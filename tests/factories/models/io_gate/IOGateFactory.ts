import { Factory } from 'fishery'
import { IOGate } from '@/models/io_gate/IOGate'
import componentFactory from '../component/ComponentFactory'

const iOGateFactory = Factory.define<IOGate>(({params, associations}) => {

  const {label = "Dummy Gate"} = params
  const {component = componentFactory.build()} = associations

  return new IOGate(label, component)
})

export default iOGateFactory
