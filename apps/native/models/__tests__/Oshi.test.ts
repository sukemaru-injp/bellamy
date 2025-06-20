import { describe, it, expect } from 'vitest'
import type { Oshi } from '../Oshi'

describe('Oshi', () => {
  it('should create valid Oshi object', () => {
    const oshi: Oshi = {
      id: '1',
      name: 'Test Oshi',
      themeColor: '#ff0000',
    }

    expect(oshi.id).toBe('1')
    expect(oshi.name).toBe('Test Oshi')
    expect(oshi.themeColor).toBe('#ff0000')
    expect(oshi.memo).toBeUndefined()
  })

  it('should create Oshi object with memo', () => {
    const oshi: Oshi = {
      id: '2',
      name: 'Test Oshi 2',
      memo: 'This is a memo',
      themeColor: '#00ff00',
    }

    expect(oshi.id).toBe('2')
    expect(oshi.name).toBe('Test Oshi 2')
    expect(oshi.memo).toBe('This is a memo')
    expect(oshi.themeColor).toBe('#00ff00')
  })
})