import { Block } from 'notion-types'

export type JSONData =
  | null
  | boolean
  | number
  | string
  | JSONData[]
  | { [prop: string]: JSONData }

export type INotionParams = {
  resource: string
  body: JSONData
  notionToken?: string
}

export type ColumnType =
  | 'select'
  | 'text'
  | 'date'
  | 'person'
  | 'checkbox'
  | 'title'
  | 'multi_select'
  | 'number'
  | 'url'

export type MultiSelectSchemaType = {
  name: string
  type: 'multi_select'
  options: Array<{
    id: string
    color: string
    value: string
  }>
}

export type ColumnSchemaType =
  | {
      name: string
      type: Exclude<ColumnType, 'multi_select'>
    }
  | MultiSelectSchemaType

export interface CollectionType {
  value: {
    id: string
    version: number
    name: string[][]
    schema: { [key: string]: ColumnSchemaType }
    icon: string
    parent_id: string
    parent_table: string
    alive: boolean
    copied_from: string
  }
}

type BoldFormatType = ['b']
type ItalicFormatType = ['i']
type StrikeFormatType = ['s']
type CodeFormatType = ['c']
type LinkFormatType = ['a', string]
type DateFormatType = [
  'd',
  {
    type: 'date'
    start_date: string
    date_format: string
  }
]
type UserFormatType = ['u', string]
type PageFormatType = ['p', string]
type SubDecorationType =
  | BoldFormatType
  | ItalicFormatType
  | StrikeFormatType
  | CodeFormatType
  | LinkFormatType
  | DateFormatType
  | UserFormatType
  | PageFormatType
type BaseDecorationType = [string]
type AdditionalDecorationType = [string, SubDecorationType[]]
export type DecorationType = BaseDecorationType | AdditionalDecorationType

type UserType = { id: string; full_name: string }

export type RowContentType =
  | string
  | boolean
  | number
  | string[]
  | { title: string; id: string }
  | UserType[]

export interface RowType {
  value: {
    id: string
    parent_id: string
    properties: { [key: string]: DecorationType[] }
  }
}

export type ExtendedBlock = Block & {
  properties: {
    [key: string]: unknown
  }
}
