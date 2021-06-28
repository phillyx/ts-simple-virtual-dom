// let _: {
//   [key: string]: Function;
// } = {};

export const type = function (obj: any) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

export const isArray = function isArray(list: any) {
  return type(list) === 'Array'
}

export const slice = function slice(arrayLike: any, index: number) {
  return Array.prototype.slice.call(arrayLike, index)
}

export const truthy = function truthy(value: any) {
  return !!value
}

export const isString = function isString(list: any) {
  return type(list) === 'String'
}
export const each = function each(array: string | any[], fn: (arg0: any, arg1: number) => void) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

export const toArray = function toArray(listLike: string | any[]) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}

export const setAttr = function setAttr(node: HTMLElement, key: string, value: string) {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break
    case 'value':
      var tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea') {
        ;(node as HTMLInputElement | HTMLTextAreaElement).value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
    // node.dataset[key] = value
    // console.log(node.outerHTML)
  }
}

// export default _;
