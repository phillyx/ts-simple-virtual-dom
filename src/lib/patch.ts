import { patchesTypes, patchTypes, T_OBJ } from '../interface'
import { setAttr } from './util'
import { Element } from './element'

export enum E_DIFF {
  REPLACE,
  REORDER,
  PROPS, // vnode  props changed
  TEXT, // vnode changed to text
  INSERT,
  REMOVE,
}

export function patch(node: HTMLElement, patches: patchesTypes) {
  let walker = { index: 0 }
  dfsWalk(node, walker, patches)
  return node
}

function dfsWalk(node: HTMLElement, walker: { index: number }, patches: patchesTypes) {
  let currentPatches = patches[walker.index]
  const len = node?.childNodes ? node.childNodes.length : 0

  for (let i = 0; i < len; i++) {
    const child = node.childNodes[i] as HTMLElement
    walker.index++
    dfsWalk(child, walker, patches)
  }
  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

function applyPatches(node: HTMLElement, currentPatches: patchTypes) {
  currentPatches.forEach(patch => {
    switch (+patch.type!) {
      case E_DIFF.REPLACE:
        const vnode = patch!.node
        const newNode = vnode!.render()
        node.parentNode!.replaceChild(newNode, node)
        break
      case E_DIFF.REORDER:
        reorderChildren(node, patch.moves!)
        break
      case E_DIFF.PROPS:
        setProps(node, patch.props!)
        break
      case E_DIFF.TEXT:
        node.textContent = patch.node?.text ?? ''
        break
      case E_DIFF.INSERT:
        node.parentNode?.appendChild(patch.node!.render())
        break
      default:
        throw new Error('UnKnown patch type ' + patch.type)
    }
  })
}
function reorderChildren(node: HTMLElement, moves: T_OBJ[]) {
  const staticNodeList = Array.from(node.childNodes)
  const maps: T_OBJ = {}
  staticNodeList.forEach(node => {
    if (node.nodeType == 1) {
      const key = (node as HTMLElement).getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })

  moves.forEach(move => {
    const index = move.index
    if (move.type === E_DIFF.REPLACE) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index])
      }
      staticNodeList.splice(index, 1)
    } else if (move.type === E_DIFF.REORDER) {
      // insert item
      const insertNode = maps[move.item.key]
        ? (maps[move.item.key] as HTMLElement).cloneNode(true)
        : typeof move.item === 'object'
        ? (move.item as Element).render()
        : document.createTextNode(move.item)
      staticNodeList.splice(index, 0, insertNode as ChildNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

function setProps(node: HTMLElement, props: T_OBJ) {
  for (let [key, value] of Object.entries(props)) {
    if (props[key] === undefined) {
      node.removeAttribute(key)
    } else {
      setAttr(node, key, value)
    }
  }
}
