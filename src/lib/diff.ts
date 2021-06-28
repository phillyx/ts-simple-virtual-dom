import { AL_DIFF as listDiff } from './list-diff'
import { IVNode, T_OBJ, T_ArrayNode, patchesTypes, patchTypes } from '../interface'
import { isText } from './isText'
import { isVNode } from './isVNode'
import { E_DIFF } from './patch'

/** props diff or node replace */
export function diff(oldNode: IVNode, newNode: IVNode): patchesTypes
/**node removed */
export function diff(oldNode: IVNode, newNode: null): patchesTypes
/**node replaced by textNode */
export function diff(oldNode: IVNode, newNode: string): patchesTypes
/**textnode replaced by IVNode */
export function diff(oldNode: string, newNode: IVNode): patchesTypes
/**textNode changed? */
export function diff(oldNode: string, newNode: string): patchesTypes
/**textNode removed */
export function diff(oldNode: string, newNode: null): patchesTypes
export function diff(oldNode: IVNode | string, newNode: IVNode | string | null): patchesTypes {
  let index = 0
  let patches: patchesTypes = {}
  dfsWalk(oldNode, newNode, index, patches)
  return patches
}

function dfsWalk(oldNode: any, newNode: any, index: number, patches: T_OBJ): void {
  let apply: any = patches[index]
  // VNode is removed
  if (newNode === null) {
    // REAL DOM NODE will be removed when perfrom reordering, os has no nedds to do anything in here
  } else if (isVNode(newNode)) {
    if (isVNode(oldNode)) {
      if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        // Diff props
        const propsPatches = diffProps(oldNode, newNode)
        if (propsPatches) {
          apply = appendPatch(apply, { type: E_DIFF.PROPS, props: propsPatches })
        }

        // Diff children. If the node has a 'ignore' property, do not diff children
        if (!isIgnoreChildren(newNode)) {
          apply = diffChildren(oldNode.children, newNode.children, index, patches, apply)
        }
      } else {
        apply = appendPatch(apply, { type: E_DIFF.REPLACE, node: newNode })
      }
    } else {
      apply = appendPatch(apply, { type: E_DIFF.REPLACE, node: newNode })
    }
  } else if (isText(newNode)) {
    if (!isText(oldNode)) {
      // TextNode content replacing
      apply = appendPatch(apply, { type: E_DIFF.TEXT, node: newNode })
    } else if (newNode.text !== oldNode.text) {
      apply = appendPatch(apply, { type: E_DIFF.TEXT, node: newNode })
    }
  }
  if (apply) {
    patches[index] = apply
  }
}

function diffChildren(
  oldChildren: T_ArrayNode,
  newChildren: T_ArrayNode,
  index: number,
  patches: T_OBJ,
  apply: patchTypes
) {
  const diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  var aLen = oldChildren.length
  var bLen = newChildren.length
  var len = aLen > bLen ? aLen : bLen
  for (var i = 0; i < len; i++) {
    var leftNode = oldChildren[i] as IVNode | string
    var rightNode = newChildren[i] as IVNode | string
    index += 1
    if (!leftNode) {
      if (rightNode) {
        // Excess nodes in b need to be added
        apply = appendPatch(apply, { type: E_DIFF.INSERT, node: rightNode })
      }
    } else {
      dfsWalk(leftNode, rightNode, index, patches)
    }
    if (isVNode(leftNode)) {
      leftNode = leftNode as IVNode
      if (leftNode.count) index += leftNode.count
    }
  }
  if (diffs.moves.length) {
    const reorderPatch = { type: E_DIFF.REORDER, moves: diffs.moves }
    apply = appendPatch(apply, reorderPatch)
  }
  return apply
}

function isIgnoreChildren(node: IVNode) {
  return node.props && node.props.hasOwnProperty('ignore')
}

function diffProps(oldNode: IVNode, newNode: IVNode) {
  let count = 0
  const oldProps = oldNode.props
  const newProps = newNode.props
  let propsPatches: T_OBJ = {}

  // value changed
  for (let [key, value] of Object.entries(oldProps)) {
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key]
    }
  }
  // and new key-value
  for (let [key, value] of Object.entries(newProps)) {
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = value
    }
  }
  if (count === 0) return null
  return propsPatches
}

function appendPatch(apply: any, patch: any): any {
  if (apply) {
    if (Array.isArray(apply)) {
      apply.push(patch)
    } else {
      apply = [apply, patch]
    }

    return apply
  } else {
    return [patch]
  }
}
