"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = void 0;
const list_diff_1 = require("./list-diff");
const isText_1 = require("./isText");
const isVNode_1 = require("./isVNode");
const patch_1 = require("./patch");
function diff(oldNode, newNode) {
    let index = 0;
    let patches = {};
    dfsWalk(oldNode, newNode, index, patches);
    return patches;
}
exports.diff = diff;
function dfsWalk(oldNode, newNode, index, patches) {
    let apply = patches[index];
    // VNode is removed
    if (newNode === null) {
        // REAL DOM NODE will be removed when perfrom reordering, os has no nedds to do anything in here
    }
    else if (isVNode_1.isVNode(newNode)) {
        if (isVNode_1.isVNode(oldNode)) {
            if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
                // Diff props
                const propsPatches = diffProps(oldNode, newNode);
                if (propsPatches) {
                    apply = appendPatch(apply, { type: patch_1.E_DIFF.PROPS, props: propsPatches });
                }
                // Diff children. If the node has a 'ignore' property, do not diff children
                if (!isIgnoreChildren(newNode)) {
                    apply = diffChildren(oldNode.children, newNode.children, index, patches, apply);
                }
            }
            else {
                apply = appendPatch(apply, { type: patch_1.E_DIFF.REPLACE, node: newNode });
            }
        }
        else {
            apply = appendPatch(apply, { type: patch_1.E_DIFF.REPLACE, node: newNode });
        }
    }
    else if (isText_1.isText(newNode)) {
        if (!isText_1.isText(oldNode)) {
            // TextNode content replacing
            apply = appendPatch(apply, { type: patch_1.E_DIFF.TEXT, node: newNode });
        }
        else if (newNode.text !== oldNode.text) {
            apply = appendPatch(apply, { type: patch_1.E_DIFF.TEXT, node: newNode });
        }
    }
    if (apply) {
        patches[index] = apply;
    }
}
function diffChildren(oldChildren, newChildren, index, patches, apply) {
    const diffs = list_diff_1.AL_DIFF(oldChildren, newChildren, 'key');
    newChildren = diffs.children;
    var aLen = oldChildren.length;
    var bLen = newChildren.length;
    var len = aLen > bLen ? aLen : bLen;
    for (var i = 0; i < len; i++) {
        var leftNode = oldChildren[i];
        var rightNode = newChildren[i];
        index += 1;
        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply, { type: patch_1.E_DIFF.INSERT, node: rightNode });
            }
        }
        else {
            dfsWalk(leftNode, rightNode, index, patches);
        }
        if (isVNode_1.isVNode(leftNode)) {
            leftNode = leftNode;
            if (leftNode.count)
                index += leftNode.count;
        }
    }
    if (diffs.moves.length) {
        const reorderPatch = { type: patch_1.E_DIFF.REORDER, moves: diffs.moves };
        apply = appendPatch(apply, reorderPatch);
    }
    return apply;
}
function isIgnoreChildren(node) {
    return node.props && node.props.hasOwnProperty('ignore');
}
function diffProps(oldNode, newNode) {
    let count = 0;
    const oldProps = oldNode.props;
    const newProps = newNode.props;
    let propsPatches = {};
    // value changed
    for (let [key, value] of Object.entries(oldProps)) {
        if (newProps[key] !== value) {
            count++;
            propsPatches[key] = newProps[key];
        }
    }
    // and new key-value
    for (let [key, value] of Object.entries(newProps)) {
        if (!oldProps.hasOwnProperty(key)) {
            count++;
            propsPatches[key] = value;
        }
    }
    if (count === 0)
        return null;
    return propsPatches;
}
function appendPatch(apply, patch) {
    if (apply) {
        if (Array.isArray(apply)) {
            apply.push(patch);
        }
        else {
            apply = [apply, patch];
        }
        return apply;
    }
    else {
        return [patch];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGlmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBaUQ7QUFFakQscUNBQWlDO0FBQ2pDLHVDQUFtQztBQUNuQyxtQ0FBZ0M7QUFjaEMsU0FBZ0IsSUFBSSxDQUFDLE9BQXdCLEVBQUUsT0FBK0I7SUFDNUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBQ2IsSUFBSSxPQUFPLEdBQWlCLEVBQUUsQ0FBQTtJQUM5QixPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDekMsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQztBQUxELG9CQUtDO0FBRUQsU0FBUyxPQUFPLENBQUMsT0FBWSxFQUFFLE9BQVksRUFBRSxLQUFhLEVBQUUsT0FBYztJQUN4RSxJQUFJLEtBQUssR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0IsbUJBQW1CO0lBQ25CLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtRQUNwQixnR0FBZ0c7S0FDakc7U0FBTSxJQUFJLGlCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDdEUsYUFBYTtnQkFDYixNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNoRCxJQUFJLFlBQVksRUFBRTtvQkFDaEIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTtpQkFDeEU7Z0JBRUQsMkVBQTJFO2dCQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlCLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQ2hGO2FBQ0Y7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTthQUNwRTtTQUNGO2FBQU07WUFDTCxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxjQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1NBQ3BFO0tBQ0Y7U0FBTSxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLDZCQUE2QjtZQUM3QixLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxjQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1NBQ2pFO2FBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDeEMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtTQUNqRTtLQUNGO0lBQ0QsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFBO0tBQ3ZCO0FBQ0gsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUNuQixXQUF3QixFQUN4QixXQUF3QixFQUN4QixLQUFhLEVBQ2IsT0FBYyxFQUNkLEtBQWlCO0lBRWpCLE1BQU0sS0FBSyxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2RCxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtJQUU1QixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFBO0lBQzdCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUE7SUFDN0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFvQixDQUFBO1FBQ2hELElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQW9CLENBQUE7UUFDakQsS0FBSyxJQUFJLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixJQUFJLFNBQVMsRUFBRTtnQkFDYixxQ0FBcUM7Z0JBQ3JDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7YUFDckU7U0FDRjthQUFNO1lBQ0wsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JCLFFBQVEsR0FBRyxRQUFrQixDQUFBO1lBQzdCLElBQUksUUFBUSxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUE7U0FDNUM7S0FDRjtJQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDdEIsTUFBTSxZQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsY0FBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2pFLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQ3pDO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFZO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBZSxFQUFFLE9BQWU7SUFDakQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBQ2IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtJQUM5QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO0lBQzlCLElBQUksWUFBWSxHQUFVLEVBQUUsQ0FBQTtJQUU1QixnQkFBZ0I7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakQsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQzNCLEtBQUssRUFBRSxDQUFBO1lBQ1AsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNsQztLQUNGO0lBQ0Qsb0JBQW9CO0lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLEtBQUssRUFBRSxDQUFBO1lBQ1AsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtTQUMxQjtLQUNGO0lBQ0QsSUFBSSxLQUFLLEtBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQzVCLE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFVLEVBQUUsS0FBVTtJQUN6QyxJQUFJLEtBQUssRUFBRTtRQUNULElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xCO2FBQU07WUFDTCxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDdkI7UUFFRCxPQUFPLEtBQUssQ0FBQTtLQUNiO1NBQU07UUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDZjtBQUNILENBQUMifQ==