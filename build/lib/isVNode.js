"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVNode = void 0;
const element_1 = require("./element");
function isVNode(node) {
    return node instanceof element_1.Element && node.tagName !== 'text';
}
exports.isVNode = isVNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaXNWTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBbUM7QUFFbkMsU0FBZ0IsT0FBTyxDQUFDLElBQVM7SUFDL0IsT0FBTyxJQUFJLFlBQVksaUJBQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQTtBQUMzRCxDQUFDO0FBRkQsMEJBRUMifQ==