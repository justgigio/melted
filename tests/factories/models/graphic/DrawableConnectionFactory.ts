import { Factory } from 'fishery' 
import { DrawableConnection } from '@/models/graphic/DrawableConnection'
import connectionFactory from '../io_gate/ConnectionFactory'

const drawableConnectionFactory = Factory.define<DrawableConnection>(({associations}) => {

  const {connection = connectionFactory.build()} = associations

  return new DrawableConnection(connection)
})

export default drawableConnectionFactory
