"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeKeyIndexAndFree = exports.AL_DIFF = void 0;
/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function AL_DIFF(oldList, newList, key) {
    let oldMap = makeKeyIndexAndFree(oldList, key);
    let newMap = makeKeyIndexAndFree(newList, key);
    let newFree = newMap.free;
    let oldKeyIndex = oldMap.keyIndex;
    let newKeyIndex = newMap.keyIndex;
    let moves = [];
    // a simulate list to manipulate
    let children = [];
    let i = 0;
    let item;
    let itemKey;
    let freeIndex = 0;
    // first pass to check item in old list: if it's removed or not
    while (i < oldList.length) {
        item = oldList[i];
        itemKey = getItemKey(item, key);
        if (itemKey) {
            if (!newKeyIndex.hasOwnProperty(itemKey)) {
                children.push(null);
            }
            else {
                let newItemIndex = newKeyIndex[itemKey];
                children.push(newList[newItemIndex]);
            }
        }
        else {
            let freeItem = newFree[freeIndex++];
            children.push(freeItem || null);
        }
        i++;
    }
    let simulateList = children.slice(0);
    // remove items no longer exist
    i = 0;
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            remove(i);
            removeSimulate(i);
        }
        else {
            i++;
        }
    }
    // i is cursor pointing to a item in new list
    // j is cursor pointing to a item in simulateList
    let j = (i = 0);
    while (i < newList.length) {
        item = newList[i];
        itemKey = getItemKey(item, key);
        let simulateItem = simulateList[j];
        let simulateItemKey = getItemKey(simulateItem, key);
        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++;
            }
            else {
                // new item, just inesrt it
                if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                    insert(i, item);
                }
                else {
                    // if remove current simulateItem make item in right place
                    // then just remove it
                    let nextItemKey = getItemKey(simulateList[j + 1], key);
                    if (nextItemKey === itemKey) {
                        remove(i);
                        removeSimulate(j);
                        j++; // after removing, current j is right, just jump to next one
                    }
                    else {
                        // else insert item
                        insert(i, item);
                    }
                }
            }
        }
        else {
            insert(i, item);
        }
        i++;
    }
    //if j is not remove to the end, remove all the rest item
    let k = simulateList.length - j;
    while (j++ < simulateList.length) {
        k--;
        remove(k + i);
    }
    function remove(index) {
        let move = { index, type: 0 };
        moves.push(move);
    }
    function insert(index, item) {
        let move = { index, item, type: 1 };
        moves.push(move);
    }
    function removeSimulate(index) {
        simulateList.splice(index, 1);
    }
    return {
        moves,
        children,
    };
}
exports.AL_DIFF = AL_DIFF;
/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree(list, key) {
    let keyIndex = {};
    let free = [];
    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        let itemKey = getItemKey(item, key);
        if (itemKey) {
            keyIndex[itemKey] = i;
        }
        else {
            free.push(item);
        }
    }
    return {
        keyIndex,
        free,
    };
}
exports.makeKeyIndexAndFree = makeKeyIndexAndFree;
function getItemKey(item, key) {
    if (!item || !key)
        return undefined;
    return typeof key === 'string' ? item[key] : key(item);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kaWZmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9saXN0LWRpZmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0E7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE9BQW9CLEVBQUUsT0FBb0IsRUFBRSxHQUFXO0lBQzdFLElBQUksTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QyxJQUFJLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDOUMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUV6QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO0lBQ2pDLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7SUFFakMsSUFBSSxLQUFLLEdBQVksRUFBRSxDQUFBO0lBRXZCLGdDQUFnQztJQUNoQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxJQUFJLENBQUE7SUFDUixJQUFJLE9BQU8sQ0FBQTtJQUNYLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtJQUVqQiwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUN6QixJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQy9CLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDcEI7aUJBQU07Z0JBQ0wsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLE9B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