export interface ConfigState {
  language: string
  autoFocus: boolean
  indentWithTab: boolean
  height: string
}

export interface InfoState {
  lines: null | number
  cursor: null | number
  selected: null | number
  length: null | number
}
