import { T_OBJ, T_ArrayNode } from '../interface';
/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
export declare function AL_DIFF(oldList: T_ArrayNode, newList: T_ArrayNode, key: string): {
    moves: T_OBJ[];
    children: (string | import("../interface").IVNode | null)[];
};
/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
export declare function makeKeyIndexAndFree(list: T_ArrayNode, key: any): {
    keyIndex: T_OBJ;
    free: (string | import("../interface").IVNode | null)[];
};
