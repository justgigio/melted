import { Factory } from 'fishery'
import { Connection } from '@/models/io_gate/Connection'
import pinFactory from './PinFactory'

const connectionFactory = Factory.define<Connection>(({associations}) => {

  const {a = pinFactory.build(), b = pinFactory.build()} = associations

  return new Connection(a, b)
})

export default connectionFactory
