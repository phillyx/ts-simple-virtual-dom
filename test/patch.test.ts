import el from '../src/lib/element'
import { diff } from '../src/lib/diff'
import { patch } from '../src/lib/patch'

import chai from 'chai'
import sinon from 'sinon'
import sionChai from 'sinon-chai'

chai.use(sionChai)
chai.should()

describe('test patch function', () => {
  it('Attributes adding', function () {
    var root = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('div', ['I love you']),
      el('section', ['I love you']),
    ])

    var root2 = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('div', { name: 'Jerry' }, ['I love you']),
      el('section', ['I love you']),
    ])

    var dom = root.render() as HTMLElement
    var patches = diff(root, root2)

    var spy = ((dom.childNodes[1] as HTMLElement).setAttribute = sinon.spy())

    var dom2 = patch(dom, patches)
    console.log(JSON.stringify(patches))
    console.log(dom2.outerHTML)
    spy.should.has.been.calledWith('name', 'Jerry').calledOnce
  })

  it('Attributes removing', function () {
    var root = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('div', ['I love you']),
      el('section', ['I love you']),
    ])

    var root2 = el('div', [
      el('p', ['I love you']),
      el('div', { name: 'Jerry' }, ['I love you']),
      el('section', ['I love you']),
    ])

    var dom = root.render() as HTMLElement
    console.log(dom.outerHTML)
    var patches = diff(root, root2)
    console.log(JSON.stringify(patches))
    var spy = (dom.removeAttribute = sinon.spy())
    var dom2 = patch(dom, patches)
    console.log(dom2.outerHTML)
    spy.should.has.been.calledOnce
  })

  it('Text replacing', function () {
    var root = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('div', ['I love you']),
      el('section', ['I love you']),
    ])

    var root2 = el('div', [
      el('p', ['I love you']),
      el('div', { name: 'Jerry' }, ['I love you']),
      el('section', ['I love you, too']),
    ])

    var dom = root.render() as HTMLElement
    var patches = diff(root, root2)
    console.log(patches)
    var dom2 = patch(dom, patches)
    console.log(dom2.outerHTML)
    dom2.childNodes[2].textContent!.should.be.equal('I love you, too')
  })

  it('Node replacing', function () {
    var root = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('div', ['I love you']),
      el('section', ['I love you']),
    ])

    var root2 = el('div', { id: 'content' }, [
      el('p', ['I love you']),
      el('p', { name: 'Jerry' }, ['I love you']),
      el('section', ['I love you, too']),
    ])

    var dom = root.render() as HTMLElement
    var patches = diff(root, root2)
    console.log(patches)
    var spy = (dom.replaceChild = sinon.spy())
    var dom2 = patch(dom, patches)
    console.log(dom2.outerHTML)
    spy.should.has.been.calledOnce
  })

  it('Nodes reordering', function () {
    var root = el('ul', { id: 'content' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var root2 = el('ul', { id: 'content' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'e' }, ['Item 5']),
      el('li', { key: 'c' }, ['Item 3']),
    ])

    var dom = root.render() as HTMLElement
    var patches = diff(root, root2)
    console.log(JSON.stringify(patches))
    var spy = (dom.insertBefore = sinon.stub())
    var spy2 = (dom.removeChild = sinon.stub())
    var dom2 = patch(dom, patches)

    spy.should.has.been.calledTwice
    spy2.should.not.has.been.called
  })

  it('Root replacing', function () {
    var root = el('ul', { id: 'content' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var root2 = el('div', { id: 'content' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'e' }, ['Item 5']),
      el('li', { key: 'c' }, ['Item 3']),
    ])

    var dom = root.render() as HTMLElement
    document.body.appendChild(dom)
    var patches = diff(root, root2)
    patch(dom, patches)
    dom = document.getElementById('content')!
    dom.innerHTML.should.be.equal((root2.render() as HTMLElement).innerHTML)
  })
  it("Using patches don't exist, should throw error", function () {
    var root = el('div', ['good'])
    var dom = root.render() as HTMLElement
    try {
      patch(dom, {
        1: [{ type: 6 }, {}],
      })
    } catch (e) {
      e.toString().should.be.equal('Error: Unknown patch type 6')
    }
  })

  it("When child node is not the same, don't remove it", function () {
    var root = el('ul', { id: 'content2' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var root2 = el('ul', { id: 'content2' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var dom = root.render() as HTMLElement
    console.log(dom.innerHTML)
    var spy = (dom.removeChild = sinon.spy())
    console.log((dom.childNodes[3] as HTMLLIElement).outerHTML)
    // var spy = sinon.spy(dom, 'removeChild')
    var child = dom.removeChild(dom.childNodes[3])
    console.log((child as HTMLElement)?.outerHTML, dom.innerHTML)
    var patches = diff(root, root2)
    console.log(JSON.stringify(patches))
    var dom2 = patch(dom, patches)
    console.log(dom2.innerHTML)
    spy.should.has.been.calledOnce
    // spy.should.have.been.called.calledOnce
  })

  it('When child nodes are the same, remove it', function () {
    var root = el('ul', { id: 'content2' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'd' }, ['Item 4']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var root2 = el('ul', { id: 'content2' }, [
      el('li', { key: 'a' }, ['Item 1']),
      el('li', { key: 'b' }, ['Item 2']),
      el('li', { key: 'c' }, ['Item 3']),
      el('li', { key: 'e' }, ['Item 5']),
    ])

    var dom = root.render() as HTMLLIElement
    var spy = sinon.spy(dom, 'removeChild')
    var patches = diff(root, root2)

    patch(dom, patches)
    spy.should.have.been.calledOnce
  })

  it('Patching input & textarea', function () {
    var input = el('div', {}, [el('input', { value: 'old string' }), el('textarea', { value: 'old string' })])
    var dom = input.render() as HTMLElement
    var input2 = el('div', {}, [el('input', { value: 'new string' }), el('textarea', { value: 'new string' })])
    var patches = diff(input, input2)
    console.log(JSON.stringify(patches))
    patch(dom, patches)
    ;(dom.childNodes[0] as HTMLInputElement).value.should.be.equal('new string')
    ;(dom.childNodes[1] as HTMLTextAreaElement).value.should.be.equal('new string')
  })
})
