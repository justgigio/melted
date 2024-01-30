import { Factory } from 'fishery'
import { Pin } from '@/models/io_gate/Pin'
import iOGAteFactory from './IOGateFactory'

const pinFactory = Factory.define<Pin>(({associations}) => {
  const { gate = iOGAteFactory.build() } = associations

  return new Pin(gate)
})

export default pinFactory
