"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
const util_1 = require("./util");
class Element {
    // constructor(_tagName: string);
    // children 类型定义为<code>T_ArrayNode</code> 就报“此重载签名与其实现签名不兼容”错误，很奇怪
    // constructor(_tagName: string, children: any);
    // constructor(_tagName: string, props: T_OBJ);
    // constructor(_tagName: string, props: T_OBJ, children: T_ArrayNode);
    constructor(_tagName, props, children) {
        this.tagName = 'div';
        this.props = {};
        this.children = [];
        this.count = 0;
        // if (!(this instanceof Element)) {
        //   if (typeof props !== "undefined") {
        //     if (Array.isArray(children)) {
        //       return new Element(_tagName, props, children);
        //     } else {
        //       return new Element(_tagName, props);
        //     }
        //   } else {
        //     if (Array.isArray(children)) {
        //       return new Element(_tagName, children);
        //     }
        //   }
        //   return new Element(_tagName);
        // }
        this.tagName = _tagName;
        this.children = children || [];
        if (props?.text) {
            this.text = props.text;
            delete props.text;
        }
        this.props = props || {};
        this.key = props?.key ?? undefined;
        let count = 0;
        for (let i = 0; i < this.children.length; i++) {
            let c = this.children[i];
            if (c instanceof Element) {
                count += c.count;
            }
            else if (typeof c === 'string') {
                this.children[i] = new Element('text', { text: c });
            }
            count++;
        }
        this.count = count;
    }
    render() {
        if (this.tagName === 'text') {
            return document.createTextNode(this.text);
        }
        const el = document.createElement(this.tagName);
        const props = this.props;
        for (let [key, value] of Object.entries(props)) {
            util_1.setAttr(el, key, value);
        }
        this.children.forEach(c => {
            let childEL = c instanceof Element ? c.render() : document.createComment('<!--null-->');
            el.appendChild(childEL);
        });
        return el;
    }
}
exports.Element = Element;
function default_1(_tagName, props, children) {
    if (arguments.length === 2) {
        const tmp = arguments[1];
        if (Array.isArray(tmp)) {
            return new Element(_tagName, {}, tmp);
        }
        else {
            return new Element(_tagName, tmp, []);
        }
    }
    else if (arguments.length === 1) {
        return new Element(_tagName, {}, []);
    }
    return new Element(_tagName, props, children);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBZ0M7QUFFaEMsTUFBYSxPQUFPO0lBUWxCLGlDQUFpQztJQUNqQyxrRUFBa0U7SUFDbEUsZ0RBQWdEO0lBQ2hELCtDQUErQztJQUMvQyxzRUFBc0U7SUFDdEUsWUFBWSxRQUFnQixFQUFFLEtBQWEsRUFBRSxRQUFzQjtRQVpuRSxZQUFPLEdBQVcsS0FBSyxDQUFBO1FBQ3ZCLFVBQUssR0FBVSxFQUFFLENBQUE7UUFDakIsYUFBUSxHQUFnQixFQUFFLENBQUE7UUFHMUIsVUFBSyxHQUFXLENBQUMsQ0FBQTtRQVFmLG9DQUFvQztRQUNwQyx3Q0FBd0M7UUFDeEMscUNBQXFDO1FBQ3JDLHVEQUF1RDtRQUN2RCxlQUFlO1FBQ2YsNkNBQTZDO1FBQzdDLFFBQVE7UUFDUixhQUFhO1FBQ2IscUNBQXFDO1FBQ3JDLGdEQUFnRDtRQUNoRCxRQUFRO1FBQ1IsTUFBTTtRQUNOLGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFBO1FBQzlCLElBQUksS0FBSyxFQUFFLElBQUksRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtZQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUE7U0FDbEI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQTtRQUNsQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEs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