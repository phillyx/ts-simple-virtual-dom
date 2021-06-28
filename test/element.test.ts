import el from '../src/lib/element'

it('test create-element', () => {
  const tree = el('div', { id: 'container' }, [
    el('h1', { style: 'color: blue' }, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')]),
  ])
  // 2. generate a real dom from virtual dom. `root` is a `div` element
  var root = tree.render() as HTMLElement
  console.log(root.outerHTML)
  expect(true).toBe(true)
})
