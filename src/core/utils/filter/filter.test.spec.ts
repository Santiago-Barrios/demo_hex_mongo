import { IUbitsFilterArgs, FilterOperatorEnum, FilterLogicalOperatorEnum } from './index'
import { filterObject } from './filter-object'

describe('filterObject', () => {
  const items = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 40 },
  ]

  it('should return all items when no filters are applied', () => {
    const args: IUbitsFilterArgs = {} // No filters
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual(items) // Expect all items to be returned
  })

  it('should filter items using AND operator', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.EqualTo, value: 'John' },
      age: { operator: FilterOperatorEnum.GreaterThan, value: 28 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([]) // Expect an empty array because no items match both criteria
  })

  it('should filter items using OR operator', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.EqualTo, value: 'John' },
      age: { operator: FilterOperatorEnum.GreaterThan, value: 28 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.OR, items, args)
    expect(result).toEqual(items) // Expect all de items
  })

  it('should filter items using OR operator with filter', () => {
    const args: IUbitsFilterArgs = {}
    const result = filterObject(FilterLogicalOperatorEnum.OR, items, args)
    expect(result).toEqual(items) // Expect all de items
  })

  it('should filter items using AND and ILike operator', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.ILike, value: 'Jo' },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'John', age: 25 }]) // Expect only one item
  })

  it('should filter items using AND and NotEqualTo operator', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.NotEqualTo, value: 'John' },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 40 },
    ]) // Expect two items
  })

  it('should filter items using AND and ', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.NotEqualTo, value: 'John' },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 40 },
    ]) // Expect two items
  })

  it('should filter items using AND and ContainsWord ', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.ContainsWord, value: 'B' },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'Bob', age: 40 }]) // Expect one item
  })

  it('should filter items using AND and GreaterThanOrEqualTo ', () => {
    const args: IUbitsFilterArgs = {
      age: { operator: FilterOperatorEnum.GreaterThanOrEqualTo, value: 40 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'Bob', age: 40 }]) // Expect one item
  })

  it('should filter items using AND and Includes ', () => {
    const args: IUbitsFilterArgs = {
      name: { operator: FilterOperatorEnum.Includes, value: 'Jane' },
      age: { operator: FilterOperatorEnum.EqualTo, value: 30 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'Jane', age: 30 }]) // Expect one item
  })

  it('should filter items using AND and LessThan  ', () => {
    const args: IUbitsFilterArgs = {
      age: { operator: FilterOperatorEnum.LessThan, value: 26 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'John', age: 25 }]) // Expect one item
  })

  it('should filter items using AND and LessThanOrEqualTo  ', () => {
    const args: IUbitsFilterArgs = {
      age: { operator: FilterOperatorEnum.LessThanOrEqualTo, value: 25 },
    }
    const result = filterObject(FilterLogicalOperatorEnum.AND, items, args)
    expect(result).toEqual([{ name: 'John', age: 25 }]) // Expect one item
  })
})
