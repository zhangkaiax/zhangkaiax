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
    利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数
        class Parent extends React.component{
            getChildMsg = (data) => {
                console.log('接收到子组件的值：', data)
            }
            render() {
                return (
                    <Child getMsg={this.getChildMsg}/>
                )
            }
        }
        class Child extends React.component {
            state = {
                msg: '我是子组件'
            }
            handleClick = () => {
                this.props.getMsg(this.state.msg)
            }
            render() {
                return (
                    <button onClick={this.handleClick}></button>
                )
            }
        }
- 兄弟组件
    将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态。
    公共父组件的指责：
        1. 提供共享状态
        2. 提供操作共享状态的方法
    要通讯的子组件只需通过props接收状态或者操作状态的方法

    class Counter extends React.component{
        // 提供共享状态
        state={
            count: 0
        }
        // 提供修改状态的方法
        increment = () => {
            this.setState({
                count: this.state.count ++
            })
            
        }
        render() {
            return (
                <div>
                    <Child1 count={this.state.count}/>
                    <Child2 onIncrement={this.increment}/>
                </div>
            )
        }
    }

    const Child1 = (props) => {
        return <h1>计数器：{props.count}</h1>
    }

    const Child2 = (props) => {
        return <button onClick={() => props.onIncrement()}>+1</button>
    }

- 嵌套组件传参（跨层级）：context
    1. 调用React.createContext()创建Provider（提供参数）和Consumer(消费数据)两个组件
        const {Provider, Consumer} = React.createContext()
    2. 使用Provider组件作为父节点
        <Provider>
            <div className="App">
                <Child />
            </div>
        </Provider>
    3. 设置value属性，表示要传递的数据
        <Provider value="XXX"></Provider>
    4. 使用Consumer组件接收数据
        <Consumer>
            {data => <span>接收到的数据：{data}</span>}
        </Consumer>

### 深入了解props
1. children属性：
    表示组件标签的子节点，当组件标签有子节点时，props就会有此属性。（这里感觉像是vue插槽里的内容）
    children的值可以是任意值。
    function Hello(props) {
        return (
            <div>
                组件的子节点：{props.children}
            </div>
        )
    }
    
    <Hello>我是子节点</Hello>

2. props校验：允许在创建组件的时候就指定props的类型、格式等
    function App (props) {
        return (
            <h1>{props.color}</h1>
        )
    }
    App.propTypes = {color: PropTypes.array} // 指定数组类型
    2.1 使用步骤：
        2.1.1 安装prop-types（yarn add / npm i prop-types）
        2.1.2 导入prop-types包： import PropTypes from 'prop-types'
    2.2 约束规则：具体见ProtoTypes官网
        2.2.1 常见类型：array bool func number object string React元素类型（element）
        2.2.2 必选：requiredFunc: PropTypes.func.required
        2.2.3 特定结构的对象： 
            optionalObjectWithShape: PropTypes.shape({
                color: PropTypes.string,
                fontSize: PropTypes.number
            })
3. props的默认值
    场景：分页组件-每页显示条数
        function App (props) {
            return (
                <div>{props.pageSize}</div>
            )
        }
        App.defaultProps = {
            pageSize: 10
        }

### 组件的生命周期
    * 只有类组件才有生命周期
    1. 创建时：执行顺序： constructor、render、componentDidMount
    - constructor：一般用来初始化state和为事件处理程序绑定this
    - render：每次组件渲染都会触发
        render() {
            ** 注意：不能在render里调用setState 因为会造成死循环
            this.setState({AAA: 'aaa'})
            return(
                <div></div>
            )
        }
    - componentDidMount： 组件挂载（完成DOM渲染）后,一般用来发送请求和进行DOM操作

    2. 更新时：执行顺序render、componentDidUpdate
    触发更新的操作：new props、setState()、forceUpdate()
    触发时机：组件更新（完成DOM渲染）后
    作用：1.发送网络请求 2.DOM操作
    ** 注意：如果要setState() 必须放在if条件中,否则会死循环
    componentDidUpdate(prevProps) {
        console.log("上一次的props：", prevProps, '当前的props：', this.props)
        if (prevProps.xxx !== this.props.xxx) {
            this.setState()
        }
    }

    3. 卸载时：组件从页面消失 componentWillUnmount
    触发时机：组件卸载
    作用：执行清理操作（比如：清理定时器）

    * 不常用的钩子函数：componentWillMount(已废弃)、componentWillReceiveProps、componentWillUpdate、shouldComponentUpdate、getDerivedStateFromProps(新，在constructor之后,render之前执行)、getSnapshotBeforeUpdate(新,在render之后执行) *


