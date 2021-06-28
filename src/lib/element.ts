import { T_OBJ, T_KEY, T_ArrayNode, IVNode } from '../interface'
import { setAttr } from './util'

export class Element implements IVNode {
  tagName: string = 'div'
  props: T_OBJ = {}
  children: T_ArrayNode = []
  key?: T_KEY
  text?: string | undefined
  count: number = 0
  parentVNode?: IVNode
  // constructor(_tagName: string);
  // children 类型定义为<code>T_ArrayNode</code> 就报“此重载签名与其实现签名不兼容”错误，很奇怪
  // constructor(_tagName: string, children: any);
  // constructor(_tagName: string, props: T_OBJ);
  // constructor(_tagName: string, props: T_OBJ, children: T_ArrayNode);
  constructor(_tagName: string, props?: T_OBJ, children?: T_ArrayNode) {
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
    this.tagName = _tagName
    this.children = children || []
    if (props?.text) {
      this.text = props.text
      delete props.text
    }
    this.props = props || {}
    this.key = props?.key ?? undefined
    let count = 0
    for (let i = 0; i < this.children.length; i++) {
      let c = this.children[i]
      if (c instanceof Element) {
        count += c.count
      } else if (typeof c === 'string') {
        this.children[i] = new Element('text', { text: c })
      }
      count++
    }
    this.count = count
  }

  render() {
    if (this.tagName === 'text') {
      return document.createTextNode(this.text!)
    }
    const el = document.createElement(this.tagName)
    const props = this.props

    for (let [key, value] of Object.entries(props)) {
      setAttr(el, key, value)
    }

    this.children.forEach(c => {
      let childEL = c instanceof Element ? c.render() : document.createComment('<!--null-->')
      el.appendChild(childEL)
    })
    return el
  }
}
// export FUNCTION rather than CLASS , avoid instantiation in constructor with FUNCTION(which actually defined the CLASS) called
export default function (_tagName: string): IVNode
export default function (_tagName: string, children: T_ArrayNode): IVNode
export default function (_tagName: string, props: T_OBJ): IVNode
export default function (_tagName: string, props: T_OBJ, children: T_ArrayNode): IVNode
export default function (_tagName: string, props?: T_OBJ, children?: T_ArrayNode): IVNode {
  if (arguments.length === 2) {
    const tmp = arguments[1]
    if (Array.isArray(tmp)) {
      return new Element(_tagName, {}, tmp)
    } else {
      return new Element(_tagName, tmp, [])
    }
  } else if (arguments.length === 1) {
    return new Element(_tagName, {}, [])
  }
  return new Element(_tagName, props, children)
}
