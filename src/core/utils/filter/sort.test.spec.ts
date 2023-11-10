import { SortEnum } from './index'
import { sortObjects } from './sort.objects'

describe('sortObjet', () => {
  const items = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 40 },
  ]

  const items2 = [
    { name: 'John', age: 25 },
    { name: 'John', age: 25 },
  ]

  it('should sort objects by descent age in the array', () => {
    const result = sortObjects('age', items, SortEnum.DESC)
    expect(result).toEqual([
      { name: 'Bob', age: 40 },
      { name: 'Jane', age: 30 },
      { name: 'John', age: 25 },
    ])
  })

  it('should sort objects by ascent age in the array', () => {
    const result = sortObjects('age', items, SortEnum.ASC)
    expect(result).toEqual([
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 40 },
    ])
  })

  it('should sort objects by ascent alphabetic name in the array', () => {
    const result = sortObjects('name', items, SortEnum.ASC)
    expect(result).toEqual([
      { name: 'Bob', age: 40 },
      { name: 'Jane', age: 30 },
      { name: 'John', age: 25 },
    ])
  })

  it('should sort objects by descent alphabetic name in the array', () => {
    const result = sortObjects('name', items, SortEnum.DESC)
    expect(result).toEqual([
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 40 },
    ])
  })

  it('should return []', () => {
    const result = sortObjects('name', [], SortEnum.DESC)
    expect(result).toEqual([])
  })

  it('should sort equals components', () => {
    const result = sortObjects('name', items2, SortEnum.DESC)
    expect(result).toEqual(items2)
  })
})
