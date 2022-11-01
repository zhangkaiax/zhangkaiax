### react 安装
npm i react react-dom
react包是核心，提供穿创建元素、组件等功能
react-domreact-domb包提供DOM相关功能等

### 使用
#### 引入react
#### 创建react元素
- 参数1: 元素的名称
- 参数2: 元素的属性
- 参数3: 元素的子节点
const title = React.createElement('h1', null, 'hello react')

#### 渲染react元素
- 参数1: 要渲染的元素
- 参数2: 挂载点
ReactDOM.render(title, document.getElementById('root'))


### react 脚手架初始化项目
1. 初始化项目
- npx create-react-app my-app
- npm init react-app my-app
- yarn create react-app my-app

### jsx 语法
const ele = (
    <div>hello react</div>
)
#### 条件渲染 
const loading = () => {
    if (isLoading) {
        return (<div>加载中...</div>)
    }
    return (<div>加载好了</div>)
}

const loadingDOM = (
    <div>{ loading() }</div>
)
#### 列表渲染
- 如果要渲染一组数据，应该使用数组的map()方法
const lists = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'},
    {id: 3, name: '王五'}
]

const list = () => (
    <ul>
     { lists.map(item => <li>{item.name}</li>)}
    </ul>
)


#### 行内样式
1. sytle 方式
<div style={{color: 'red', backgroundColor: 'yellow'}}></div>

2. class 方式
<div className="class_1"></div>


### react 组件

+ 组件
  - 函数组件
    1. 函数名称必须以大写字母开头
    2. 函数必须有返回值
  fuction Hello() {
    return (
        <div>函数组件</div>
    )
  }
  - 类组件


