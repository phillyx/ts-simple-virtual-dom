import { E_DIFF } from '../lib/patch'

export type T_OBJ = {
  [key: string]: any
}
export type T_KEY = string | number

export type T_ArrayNode = Array<IVNode | string | null>

export interface IVNode {
  tagName: string
  children: T_ArrayNode
  key?: T_KEY
  text?: string
  count: number
  props: T_OBJ
  parentVNode?: IVNode
  render(): HTMLElement | Text
}
export type _patchType = {
  type?: E_DIFF
  node?: IVNode
  content?: string
  moves?: T_OBJ[]
  props?: T_OBJ | null
  parentNode?: IVNode
}
export type patchTypes = Array<_patchType>
export type patchesTypes = {
  [key: number]: patchTypes
}
