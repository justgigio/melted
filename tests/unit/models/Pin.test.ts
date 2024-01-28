import { expect, test } from 'vitest'
import { type IOGate, Pin } from '@/models/IOGate'

test('Connect to other Pin', () => {
  const mockGate = {} as IOGate
  const pinA = new Pin(mockGate)
  const pinB = new Pin(mockGate)

  pinA.connect(pinB)

  const connectionAB = pinA.connections[0]
  const connectionBA = pinB.connections[0]

  expect(connectionAB.a).toBe(pinA)
  expect(connectionAB.b).toBe(pinB)
  expect(connectionBA.a).toBe(pinB)
  expect(connectionBA.b).toBe(pinA)
})