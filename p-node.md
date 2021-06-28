## 伪代码形式简单介绍virtual dom patch算法

```js
patchNode(oldVnode, vnode){
  // 先拿到真实的DOM
  const el = vnode.el = oldVnode.el
  // 分别拿出新旧节点的子元素
  let i，oldCh = oldVnode.children, ch = vnode.children

  // 如果新旧节点相同，直接返回
  if(oldVnode == vnode) retrun

  // 只有文字节点不同
  if(isTextNode(oldVnode) && isTextNode(vnode)){
    if(!isNullOrEmpty(oldVnode) && !isNullOrEmpty(vnode) && oldVnode.text !== vnode.text){
      patchAPI.setTextContent(el, vnode.text)
    }
  }else{
    // 更新属性，绑定事件
    pathAPI.updateElement(oldVnode, vnode)
    // 更新子元素
    // 1. 新旧结点的子元素都存在
    if(oldCh.length > 0 && ch.length > 0){
      pathAPI.updateChildren() => forEach((oldx,x) => pathNode(oldx, x))
    }else if(ch.length > 0){
      // 2.只有新节点有元素
      patchAPI.createEl(vnode) => el.append(createDOM(vnode.children))  
    }else if(oldCh.length > 0){
      // 如果只有旧节点有子元素，那么发生的时新节点删除了子元素
      patchAPI.removeChidren(el) => el.empty()
    }
  }
}

```