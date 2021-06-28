import { Element } from './element'

export function isVNode(node: any) {
  return node instanceof Element && node.tagName !== 'text'
}
