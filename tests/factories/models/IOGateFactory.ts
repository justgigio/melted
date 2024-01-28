import { Factory } from 'fishery'
import { IOGate, IOState, DrawableGate, Pin, Connection } from '@/models/IOGate';
import { Component } from '@/models/Component/Component';

const iOGAteFactory = Factory.define<IOGate>(({params}) => {
  return {
    label: label as string,
    component: component as Component,
    state: IOState.DISCONNECTED,
    forcedState: undefined,
    timeout: undefined,
    running: false,
    in: {} as Pin,
    out: {} as Pin,
    graphic: undefined,
  }
})

// const user = iOGAteFactory.build({
//   name: 'Susan',
//   address: { city: 'El Paso' },
// });