---
highlight: vs2015
theme: github
---
# 一、单元测试
- 单元测试是用来测试项目中的一个模块的功能，如函数、类、组件等
- 可以验证代码的正确性，为上线前做更详细的准备，测试用例可以整合到代码版本管理中，自动执行单元测试，避免每次手工操作，测试用例可以多次验证，当需要回归测试时能够节省大量时间

# 二、测试工具调研
- 目前用的最多的前端单元测试框架主要有 [Mocha](https://link.juejin.cn/?target=https%3A%2F%2Fmochajs.cn%2F "https://mochajs.cn/")，[Jest](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jestjs.cn%2F "https://www.jestjs.cn/")、, Jasmine, QUnit
- 在github starts，issues 量，npm下载量三方面，Facebook开源（社区强大）
- [Jest](https://jestjs.io/zh-Hans/) 支持 [Babel](https://babeljs.io/)、[TypeScript](https://www.typescriptlang.org/)、[Node](https://nodejs.org/)、[React](https://reactjs.org/)、[Angular](https://angular.io/)、[Vue](https://vuejs.org/)
- jest自动集成了断言、JSDom、覆盖率报告等开发者所需要的所有测试工具，配置较少，对vue框架友好。

# 三、使用

### 1.测试js文件
-  安装
```js
yarn add --dev jest 
# or 
npm install -D jest
```
- 新建 ./index.js 文件

```js
function sum(a, b) { 
    return a + b; 
} 
module.exports = sum;
```
- 新建 index.test.js 文件（jest会自动识别  * .test.*  和 * .spec. * 的文件）
**注意：**  jest 不支持 es6 语法， 需要安装babel

```js
const sum = require('../sum');

describe('sum function test', () => {
  it('sum(1, 2) === 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('sum(1, 2) === 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
})


```
- 将test命令添加到 package.json 里面

```js
{
  "scripts": {
    "test": "jest"
  },
}

```
- npm run test

### 2.新建Vue项目(使用vue-cli脚手架)
- 注意勾选Unit Tseting和babel, 之后选择 Jest 
- 项目生成后，package.json 中，会有[@vue/cli-plugin-unit-jest](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-unit-jest/README.md) 依赖，并且目录生成jest.config.js配置文件

### 3.在老项目中新增jest工具
```  
vue add unit-jest //需要安装Vue-Cli
```
此条命令执行以后，会自动帮助我们安装`@vue/cli-plugin-unit-jest`，同时会帮助我们进行`jest`测试相关的配置，并且它也会帮我们在根目录下新建`tests`文件夹，包含测试用例`example.spec.js`
之后可以使用`npm run test:unit`来运行测试用例。
- vscode插件: `Jest` `Jest Runner`

# 四、配置
- 默认生成的jest.config.js文件 `preset: '@vue/cli-plugin-unit-jest',`需要根据需要手动添加
- 参考配置
```javascript

  preset: '@vue/cli-plugin-unit-jest',
  // 生成覆盖率文件夹
  collectCoverage: true,
  // 测试报告存放位置(默认是根目录)
  coverageDirectory:  '<rootDir>/tests/unit/coverage',
  // 测试哪些文件和不测试哪些文件
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
  // 指定setup的位置
  setupFiles: ['<rootDir>/tests/setup.js'], 
  // Jest 需要匹配的文件后缀
  moduleFileExtensions: [
     'js',
     'vue'
  ],
  // 匹配到 .vue 文件的时候用 vue-jest 处理， 
  // 匹配到 .js 文件的时候用 babel-jest 处理
  transform: {
     ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  // 处理 webpack 的别名，比如：将 @ 表示 /src 目录
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/components/$1'
  },
  // 将保存的快照测试结果进行序列化，使得其更美观
  snapshotSerializers: [
      'jest-serializer-vue'
  ],
  // 匹配哪些文件进行测试(测试脚本)
  testMatch: ['**/tests/**/*.spec.js'],
  // 不进行匹配的目录
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
```
- setup.js (类似于main.js),可以挂载全局方法，全局变量比如window,使用elementUI
```js
import {shallowMount,mount, config, createLocalVue } from '@vue/test-utils';
window.globalConfig = {
    env: '{{ .env }}',
    region: '{{ .region }}',
    baseUrl: '{{ .base_url }}',
    baseTitle: 'BytePower',
    apiUrl: '/api/'
}
import * as utils from '../src/components/utils';
import ElementUI from 'element-ui'
Vue.use(ElementUI)
```


# 五、jest常用语法（断言）
1. **toBe**  判断两个预期值与实际值是否相同，用的是JS中的Object.is()，不能检测对象，如果要检测对象的值的话，需要用到toEqual。

2. **区分undefined、null和false**
- toBeNull只匹配null
- toBeUndefined只匹配undefined
- toBeDefine与toBeUndefined相反
- toBeTruthy匹配任何if语句为真
- toBeFalsy匹配任何if语句为假
3.**数字匹配器**
- 大于。toBeGreaterThan()
- 大于或者等于。toBeGreaterThanOrEqual()
- 小于。toBeLessThan()
- 小于或等于。toBeLessThanOrEqual()
- toBe和toEqual同样适用于数字
    注意：对比两个浮点数是否相等的时候，使用toBeCloseTo（类似于越约等于）而不是toEqual 比如0.1+0.2 约等于0.3
4.**字符串**
- 使用toMatch()测试字符串，传递的参数是正则表达式。
5.**数组**
- 如何检测数组中是否包含特定某一项？可以使用toContain()
6.**对象**
- 是否包含某个key，可以用toHaveProperty
    eg:expect(wrapper.vm.currentDashboard).toHaveProperty('id')
7.**组件相关**(模拟用户操作)
- `setChecked` 设置`checkbox`或者`radio`元素的`checked`的值并更新`v-model`。
- `setSelected` 设置一个`option`元素并更新`v-model`。
- `setValue` 设置一个`input`或`select`元素的值并更新`v-model`。
- `setProps` 设置包裹器的`vm`实例中`propss`并更新。
- `setData` 设置包裹器中`vm`实例中的`data`并更新。
- **注意** 操作dom的一些异步事件，要使用async await 或 $nextTick
- 使用选择器查找标签 find findAll （使用的是querySelector）
- 判断标签是否存在 exists()
- 使用findComponent，findAllComponents 来查找第三方组件或子组件

```js
// shallowMount只会挂载当前组件不挂载子组件，mount会挂载子组件
import { mount,shallowMount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('套件', () => {
  test("一条测试用例", () => {
    const wrapper = mount(ParentComponent)
    // 触发子组件的emit
    wrapper.findComponent(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})

```
- `beforeEach` 和 `afterEach` 对每个test都操作一次，类似vue-router的路由钩子
- 类似的还有 `beforeAll` 和 `afterAll`，在当前spec测试文件开始前和结束后的单次执行。
- 执行顺序

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll


```

# mock数据
1. const mockFun = jest.fn() 创建一个mock函数 常用于回调函数
2. mockFun() 会返回undefined，可以传入参数jest.fn(v => v)
3. mock函数的其他操作
```js
// 此 mock 函数被调用了两次 
expect(mockCallback.mock.calls.length).toBe(2); 
// 第一次调用函数时的第一个参数是 0 
expect(mockCallback.mock.calls[0][0]).toBe(0); 
// 第二次调用函数时的第一个参数是 1 
expect(mockCallback.mock.calls[1][0]).toBe(1); 
// 第一次函数调用的返回值是 42
expect(mockCallback.mock.results[0].value).toBe(42);
```
4. eg:
```js
// 当前组件的方法 提交表单
// submit按钮在父组件，所以saveData这个方法由父组件调用
saveData(callback) {
    this.$refs['domainForm'].validate(valid => {
        if (valid) {
            if (callback) {
                callback(domains);
            }
        } else {
            if (callback) {
                callback(null);
            }
        }
    });
}
// 使用mock函数作为回调函数测试 add-domain
addDomainWrapper.vm.saveData(jest.fn(v=>{
    expect(v).toEqual(domains)
}))
```

# 踩坑
- setup.js中config.stubs.transition = false，可以解决vm.$el
 `# TypeError: Cannot read property '$el' of undefined` 这个报错
- 引入elementUI 之后样式报错，因为没有引入处理样式的插件 
官方说明 https://github.com/facebook/jest/blob/main/docs/Webpack.md

elementUI issue https://github.com/ElementUI/babel-plugin-component/issues/59
```
npm install --save-dev identity-obj-proxy
```
- elementui+jest+unit-jest 使用setValue给select控件赋值，但是elementUI中的el-select组件不是对select的封装，而是使用input封装，因此不能使用setValue
```html
 <input type="text" readonly="readonly" autocomplete="off"  placeholder="Select" class="el-input__inner">
 //option
 <ul class="el-select-dropdown__list">
     <li class="el-select-dropdown__item selected hover">
         <span>Android</span>
     </li>
     <li class="el-select-dropdown__item">
         <span>iOS</span>
     </li>
 </ul>
 
```
解决方法：
```javascript
const ul = FormWrapper.find('.el-select-dropdown__list')
const li = ul.findAll('.el-select-dropdown__item')
await li.at(1).trigger('click')
```
[test-utils setSelected文档](https://v1.test-utils.vuejs.org/zh/api/wrapper/#setselected)

[参考文章](https://qa.1r1g.com/sf/ask/3762462231/)

- 使用shallowMount挂载的组件，内部使用element的组件，无法通过find找到节点，需要使用mount挂载（之前以为只有自定义组件才需要使用mount）
- 对upload组件进行测试需要验证文件上传的过程，nodejs环境可以模拟此操作https://github.com/jsdom/jsdom/issues/1272#issuecomment-361106435


# 目前没涉及的部分
- Style测试
- TS测试

# 参考文章
- [前端抢饭碗系列之Vue项目中如何做单元测试](https://juejin.cn/post/6953961160223752205#heading-6)
- [Jest 常用Api](https://juejin.cn/post/7035627291275165732#heading-0)
- [Vue Test Utils + jest 实现前端单元测试](https://github.com/YalongYan/vue-test-utils-jest)
- [vue 2.0版本elementui test unit单元测试 mock axios vuex $route](https://blog.csdn.net/u013466380/article/details/116011771)
