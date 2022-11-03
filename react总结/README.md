### react 安装
npm i react react-dom
react包是核心，提供创建元素、组件等功能
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
    <!--状态（state）-->
  - 函数组件(无状态组件)：只负责数据的展示
    1. 函数名称必须以大写字母开头。如果小写开头，react会认为是一个普通的标签，大写开头会当成组件处理
    2. 函数必须有返回值
    fuction Hello() {
        return (
            <div>函数组件</div>
        )
    }

    const Hello = () => <div>函数组件</div>

  - 类组件(有状态组件)：使用es6中的class创建的组件，负责更新UI
    1. 类名也为大写字母开头
    2. 类继承React.Component
    3. 类组件必须提供render方法
    4. render方法必须有返回值
    class Hello extends React.Component{
      render(
        return (
            <div>类组件</div>
        )
      )
    }
    ReactDOM.render(<hello />, root)

#### 事件绑定
    1. 在类组建中通过this.function调用
    2. 在函数组件中直接通过functionName调用
    onclick()
    ````
        onclick(){

        }
        <div onclick={this.onclick}></div>
    ````

 #### 事件对象
    可以通过事件处理程序的参数获取事件对象，比如参数(e){e.preventDefault()}

### 状态state

#### state的使用
    1. 调用
            class Hello extends React.component {
                <!-- constructor() {
                    super()
                    this.state = {}
                } -->
                state = {

                }
                render() {
                    return(
                        <div>{this.state.XXX}</div>
                    )
                }
            }
    2. 设置 通过setState()来改变state的值: this.setState({XXX: YYY})
        如果将标签里的事件方法抽离成单独的jsx中，则需要处理this的指向
        class Hello extends React.component {
                state = {
                    count: 0
                }
                countClick() {
                    <!-- 这个时候this会报错-->
                    this.setState({count: this.state.count + 1 })
                }
                render() {
                    return(
                        <div onclick={this.countClick()}>{this.state.count}</div>
                    )
                }
            }
        + 处理this的指向问题
          - 箭头函数
            <div onclick={() => this.countClick()}>{this.state.count}</div>
          - Function.prototype.bind()
            constructor() {
                super()
                this.countClick = this.countClick.bind(this)
            }
            或
            <div onclick={this.countClick.bind(this)}>{this.state.count}</div>
          - class的实例方法
            countClick = () => {
                this.setState({count: this.state.count + 1 })
            }

### 表单处理
1. 受控组件：其值受到React控制的表单元素
    HTML中的表单元素是可以输入的，也就有自己的可变状态，而React中可变状态通常保存在state中，并且只能通过setState方法来修改；所以，React将state中的值与表单元素的值value绑定在一起，由state的值来控制表单元素的值
    state = {
        text: ''
    }
    handleChange = (e) => {
        this.setState({text: e.target.value})
    }
    <input type="text" value={this.state.text onChange={this.handleChange}} />
2. 非受控组件： 借助ref，使用原生DOM方式来获取表单值
        constructor() {
            super()
            this.textRef = React.createRef()
        }

        <input type="text" ref={this.textRef} />

        console.log(this.textRef.current.value)


### 组件通讯
#### props
<Hello name="jack" age={19}></Hello>

1. 函数式组件
    function Hello(props) {
        return (
            <div>接收到的数据：{props.name}</div>
        )
    }
2. 类组件  注意：使用类组件时，如果写了构造函数，应该把props传递给super，否则无法在构造函数中取到props
    class Hello extends React.component {
        constructor(props) {
            super(props) // 注意事项描述的就是这里
        }
        render() { // render中是可以拿到props的
            return(
                <div>接收到的数据：{this.props.name}</div>
            )
        }
    }

#### 组件通讯的三种方式

- 父组件 to 子组件
    1. 父组件将值作为子组件的属性传递给子组件
    2. 子组件通过props接收父组件的传值
- 子组件 to 父组件
- 兄弟组件
