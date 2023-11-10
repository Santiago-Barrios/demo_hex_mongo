import { SortEnum } from './filter.enums'

export function sortObjects(key: string, items: any[], sort: SortEnum): any[] {
  if (!items || items.length === 0) return []

  items = items.sort((a, b) => {
    if (Number.isInteger(a[key]) && Number.isInteger(b[key])) {
      return a[key] - b[key]
    } else {
      const fa = `${a[key]}`.trim().toLowerCase()
      const fb = `${b[key]}`.trim().toLowerCase()
      if (fa < fb) return -1
      if (fa > fb) return 1
      return 0
    }
  })

  if (sort === SortEnum.DESC) items = items.reverse()

  return items
}
