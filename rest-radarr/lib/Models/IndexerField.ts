import { SelectOption } from './SelectOption.ts'

export interface IndexerField {
  order: number
  name: string
  label: string
  value: any
  type: string
  advanced: boolean
  helpText: string
  selectOptions: SelectOption[]
  helpLink: string
}
