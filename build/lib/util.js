"use strict";
// let _: {
//   [key: string]: Function;
// } = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttr = exports.toArray = exports.each = exports.isString = exports.truthy = exports.slice = exports.isArray = exports.type = void 0;
exports.type = function (obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
};
exports.isArray = function isArray(list) {
    return exports.type(list) === 'Array';
};
exports.slice = function slice(arrayLike, index) {
    return Array.prototype.slice.call(arrayLike, index);
};
exports.truthy = function truthy(value) {
    return !!value;
};
exports.isString = function isString(list) {
    return exports.type(list) === 'String';
};
exports.each = function each(array, fn) {
    for (var i = 0, len = array.length; i < len; i++) {
        fn(array[i], i);
    }
};
exports.toArray = function toArray(listLike) {
    if (!listLike) {
        return [];
    }
    var list = [];
    for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i]);
    }
    return list;
};
exports.setAttr = function setAttr(node, key, value) {
    switch (key) {
        case 'style':
            node.style.cssText = value;
            break;
        case 'value':
            var tagName = node.tagName || '';
            tagName = tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') {
                ;
                node.value = value;
            }
            else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
        // node.dataset[key] = value
        // console.log(node.outerHTML)
    }
};
// export default _;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsV0FBVztBQUNYLDZCQUE2QjtBQUM3QixVQUFVOzs7QUFFRyxRQUFBLElBQUksR0FBRyxVQUFVLEdBQVE7SUFDcEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzFFLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLElBQVM7SUFDL0MsT0FBTyxZQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFBO0FBQy9CLENBQUMsQ0FBQTtBQUVZLFFBQUEsS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFDLFNBQWMsRUFBRSxLQUFhO0lBQy9ELE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUNyRCxDQUFDLENBQUE7QUFFWSxRQUFBLE1BQU0sR0FBRyxTQUFTLE1BQU0sQ0FBQyxLQUFVO0lBQzlDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxJQUFTO0lBQ2pELE9BQU8sWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUFDWSxRQUFBLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQyxLQUFxQixFQUFFLEVBQXFDO0lBQzVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNoQjtBQUNILENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLFFBQXdCO0lBQzlELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3ZCO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxJQUFpQixFQUFFLEdBQVcsRUFBRSxLQUFhO0lBQ25GLFFBQVEsR0FBRyxFQUFFO1FBQ1gsS0FBSyxPQUFPO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBQzFCLE1BQUs7UUFDUCxLQUFLLE9BQU87WUFDVixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQy9CLElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUNqRCxDQUFDO2dCQUFDLElBQStDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTthQUNoRTtpQkFBTTtnQkFDTCw4REFBOEQ7Z0JBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzlCO1lBQ0QsTUFBSztRQUNQO1lBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDL0IsNEJBQTRCO1FBQzVCLDhCQUE4QjtLQUMvQjtBQUNILENBQUMsQ0FBQTtBQUVELG9CQUFvQiJ9