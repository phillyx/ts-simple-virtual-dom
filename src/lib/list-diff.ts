import { T_OBJ, T_ArrayNode } from '../interface'
/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
export function AL_DIFF(oldList: T_ArrayNode, newList: T_ArrayNode, key: string) {
  let oldMap = makeKeyIndexAndFree(oldList, key)
  let newMap = makeKeyIndexAndFree(newList, key)
  let newFree = newMap.free

  let oldKeyIndex = oldMap.keyIndex
  let newKeyIndex = newMap.keyIndex

  let moves: T_OBJ[] = []

  // a simulate list to manipulate
  let children = []
  let i = 0
  let item
  let itemKey
  let freeIndex = 0

  // first pass to check item in old list: if it's removed or not
  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)
      } else {
        let newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      let freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  }

  let simulateList = children.slice(0)

  // remove items no longer exist
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i)
      removeSimulate(i)
    } else {
      i++
    }
  }

  // i is cursor pointing to a item in new list
  // j is cursor pointing to a item in simulateList
  let j = (i = 0)
  while (i < newList.length) {
    item = newList[i]
    itemKey = getItemKey(item, key)

    let simulateItem = simulateList[j]
    let simulateItemKey = getItemKey(simulateItem, key)

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++
      } else {
        // new item, just inesrt it
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item)
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          let nextItemKey = getItemKey(simulateList[j + 1], key)
          if (nextItemKey === itemKey) {
            remove(i)
            removeSimulate(j)
            j++ // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item)
          }
        }
      }
    } else {
      insert(i, item)
    }

    i++
  }

  //if j is not remove to the end, remove all the rest item
  let k = simulateList.length - j
  while (j++ < simulateList.length) {
    k--
    remove(k + i)
  }

  function remove(index: number) {
    let move = { index, type: 0 }
    moves.push(move)
  }

  function insert(index: number, item: any) {
    let move = { index, item, type: 1 }
    moves.push(move)
  }

  function removeSimulate(index: number) {
    simulateList.splice(index, 1)
  }

  return {
    moves,
    children,
  }
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
export function makeKeyIndexAndFree(list: T_ArrayNode, key: any) {
  let keyIndex: T_OBJ = {}
  let free = []
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    let itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex,
    free,
  }
}

function getItemKey(item: any, key: any) {
  if (!item || !key) return undefined
  return typeof key === 'string' ? item[key] : key(item)
}
