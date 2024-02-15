import { Factory } from 'fishery'
import { Pin } from '@/models/io_gate/Pin'
import iOGateFactory from './IOGateFactory'

const pinFactory = Factory.define<Pin>(({associations}) => {
  const { gate = iOGateFactory.build() } = associations

  return new Pin(gate)
})

export default pinFactory
