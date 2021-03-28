import { mapValues } from 'lodash'
import { format } from 'date-fns'

export const serialize = <T extends object>(json: T) =>
  mapValues(json, (value) => {
    if (value instanceof Date) {
      return format(value, 'MMMM do, YYYY')
    }
    return value
  }) as T
