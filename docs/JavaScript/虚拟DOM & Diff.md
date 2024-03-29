## 实现
- 用JS去按照DOM结构来实现的树形结构对象
```js
// element.js

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 创建虚拟DOM，返回虚拟节点(object)
function createElement(type, props, children) {
    return new Element(type, props, children);
}

// render方法可以将虚拟DOM转化成真实DOM
function render(domObj) {
    // 根据type类型来创建对应的元素
    let el = document.createElement(domObj.type);
    
    // 再去遍历props属性对象，然后给创建的元素el设置属性
    for (let key in domObj.props) {
        // 设置属性的方法
        setAttr(el, key, domObj.props[key]);
    }
    
    // 遍历子节点
    // 如果是虚拟DOM，就继续递归渲染
    // 不是就代表是文本节点，直接创建
    domObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        // 添加到对应元素内
        el.appendChild(child);
    });

    return el;
}

// 设置属性
function setAttr(node, key, value) {
    switch(key) {
        case 'value':
            // node是一个input或者textarea就直接设置其value即可
            if (node.tagName.toLowerCase() === 'input' ||
                node.tagName.toLowerCase() === 'textarea') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            // 直接赋值行内样式
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

// 将元素插入到页面内
function renderDom(el, target) {
    target.appendChild(el);
}

export {
    Element,
    createElement,
    render,
    setAttr,
    renderDom
};
```
- type: 指定元素的标签类型，如'li', 'div', 'a'等
- props: 表示指定元素身上的属性，如class, style, 自定义属性等
- children: 表示指定元素是否有子节点，参数以数组的形式传入

```js
// index.js

// 引入createElement、render和renderDom方法
import { createElement, render, renderDom } from './element';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

console.log(virtualDom);

let el = render(virtualDom); // 渲染虚拟DOM得到真实的DOM结构
console.log(el);
// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root'));
```

## DOM-diff 
- 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM（比较两个对象的区别）
```js
// diff.js

function diff(oldTree, newTree) {
    // 声明变量patches用来存放补丁的对象
    let patches = {};
    // 第一次比较应该是树的第0个索引
    let index = 0;
    // 递归树 比较后的结果放到补丁里
    walk(oldTree, newTree, index, patches);

    return patches;
}
// 比较新旧dom
function walk(oldNode, newNode, index, patches) {
    // 每个元素都有一个补丁
    let current = [];

    if (!newNode) { // 如果没有new节点的话，就直接将type为REMOVE的类型放到当前补丁里
        current.push({ type: 'REMOVE', index });
    } else if (isString(oldNode) && isString(newNode)) { // 如果新老节点是文本的话，判断一下文本是否一致，再指定类型TEXT并把新节点放到当前补丁
        // 判断文本是否一致
        if (oldNode !== newNode) {
            current.push({ type: 'TEXT', text: newNode });
        }

    } else if (oldNode.type === newNode.type) { // 如果新老节点的类型相同，那么就来比较一下他们的属性props
        // 比较属性是否有更改
        let attr = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attr).length > 0) {
            current.push({ type: 'ATTR', attr });
        }
        // 如果有子节点，遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else {    // 说明节点被替换了,直接用newNode替换即可
        current.push({ type: 'REPLACE', newNode});
    }
    
    // 当前元素确实有补丁存在
    if (current.length) {
        // 将元素和补丁对应起来，放到大补丁包中
        patches[index] = current;
    }
}

function isString(obj) {
    return typeof obj === 'string';
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性中和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) { //去比较新老Attr是否相同
            patch[key] = newAttrs[key]; // 有可能还是undefined
        }
    }

    for (let key in newAttrs) {
        // 老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) { // 把newAttr的键值对赋给patch对象上并返回此对象
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

// 所有都基于一个序号来实现
let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个,遍历oldChildren，然后递归调用walk再通过child和newChildren[index]去diff
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    });
}

// 默认导出
export default diff;
```

## 比较规则
- 新的DOM节点不存在{type: 'REMOVE', index}
- 文本的变化{type: 'TEXT', text: 1}
- 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTR', attr: {class: 'list-group'}}
- 节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode}


## patch补丁更新
- 打补丁需要传入两个参数，一个是要打补丁的元素，另一个就是所要打的补丁了，那么直接看代码
```js
import { Element, render, setAttr } from './element';

let allPatches;
let index = 0;  // 默认哪个需要打补丁

function patch(node, patches) {
    allPatches = patches;
    
    // 给某个元素打补丁
    walk(node);
}

function walk(node) {
    let current = allPatches[index++];
    let childNodes = node.childNodes;

    // 先序深度，继续遍历递归子节点
    childNodes.forEach(child => walk(child));

    if (current) {
        doPatch(node, current); // 打上补丁
    }
}

function doPatch(node, patches) {
    // 根据传递的patches进行遍历
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTR': // 属性ATTR for in去遍历attrs对象
                for (let key in patch.attr) {
                    let value = patch.attr[key];
                    if (value) { // 当前的key值如果存在，就直接设置属性setAttr
                        setAttr(node, key, value);
                    } else { // 如果不存在对应的key值那就直接删除这个key键的属性
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT': // 文字TEXT 直接将补丁的text赋值给node节点的textContent
                node.textContent = patch.text;
                break;
            case 'REPLACE': // 先判断新节点是不是Element的实例，是的话调用render方法渲染新节点；
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode); // 是的话调用render方法渲染新节点；不是的话就表明新节点是个文本节点，直接创建一个文本节点
                node.parentNode.replaceChild(newNode, node); // 之后再通过调用父级parentNode的replaceChild方法替换为新的节点
                break;
            case 'REMOVE': //删除REMOVE 直接调用父级的removeChild方法删除该节点
                node.parentNode.removeChild(node); 
                break;
            default:
                break;
        }
    });
}

export default patch;

```

```js

// index.js

import { createElement, render, renderDom } from './element';
// +++ 引入diff和patch方法
import diff from './diff';
import patch from './patch';
// +++

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])    
]);

let el = render(virtualDom);
renderDom(el, window.root);

// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item active'}, ['七里香']),
    createElement('li', {class: 'item'}, ['一千年以后']),
    createElement('li', {class: 'item'}, ['需要人陪'])    
]);
// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
console.log(patches);
// 将变化打补丁，更新到el
patch(el, patches);

```

## DOM-diff
1. 用JS对象模拟DOM（虚拟DOM）
2. 把此虚拟DOM转成真实DOM并插入页面中（render）
3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
4. 把差异对象应用到真正的DOM树上（patch）
