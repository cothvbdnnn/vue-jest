import * as Filters from '@/utils/filters'

const { upperText } = Filters

describe('Test Filters', () => {
  it('TEST CASE 1: upperText', () => {
    const value = upperText('test')
    expect(value).toBe('Test')
  }) 
})