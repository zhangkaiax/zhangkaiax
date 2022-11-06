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

    * 不常用的钩子函数：componentWillMount(已废弃)、componentWillReceiveProps、componentWillUpdate、getDerivedStateFromProps(新，在constructor之后,render之前执行)、getSnapshotBeforeUpdate(新,在render之后执行) *

    * shouldComponentUpdate: 更新阶段的钩子函数，组件渲染（render）前执行，避免不必要的更新
        shouldComponentUpdate(nextProps, nextState)
            nextProps: 最新的props
            nextState: 最新的state
        一般用nextProps/nextState中的值去和this.props（发生在子组件判断）/this.state（父组件）来判断是否需要渲染

### render-props模式 
通过给props里增加方法属性来实现子组件的复用
### 高阶组件（HOC）
高阶组件是一个函数，接收要包装的组件，通过在函数内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态给被包装组件的方式，返回增强后的组件。
目的：组件复用
手段：采用包装（装饰）模式

        const EnhanceComponent = withHOC(WrappedComponent)

        <!-- 高阶组件内部创建的类组件 -->
        function withMouse(WrappedComponent) {
            class Mouse extends React.component {
                state = {
                    x: 0,
                    y: 0
                }
                handleMouseMove = (e) => {
                    this.setState({
                        x: e.clientX,
                        y: e.clientY
                    })
                }
                compomnentDidMount() {
                    window.addEventListener('mouseMove', this.handleMouseMove)
                }
                componentWillUnmount() {
                    window.removeEventListener('mouseMove', this.handleMouseMove)
                }
                render() {
                    return (
                        <WrappedComponent {...this.state} />
                    )
                }
            }
            return Mouse
        }

> 高阶函数的使用步骤
  1. 创建一个函数，名称约定以with开头
  2. 指定函数参数，参数名称以大写字母开头（作为要渲染的组件）
> 设置displayName
  why? 因为默认情况下，React使用组件名称作为displayName，而通过高阶组件得到的组件名称相同
  displayName的作用：用于设置调试信息（React Developer Tools信息）
> 设置方式

        Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
        function getDisplayName(WrappedComponent) {
            return WrappedComponent.displayName || WrappedComponent.name || 'Component'
        }
> 传递props
  问题：props丢失
  原因：高阶组件没有往下传递props
  解决方法：渲染WrappedComponent时，将state和this.props一起传递给组件

  <WrappedComponent {...this.state} {...this.props} />

### react路由
    使用步骤：
        1. yarn add react-router-dom
        2. 导入路由的三个核心组件： Router/Route/Link:

            import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
        3. 使用Router组件包裹整个应用.
            两种Router:HashRouter、BrowserRouter。HashRouter在端口号后/#/

            <Router>
                <div className='app'>
                    // ...
                </div>
            </Router>
        4. 使用Link组件作为导航菜单（路由入口）

            <Link to="/first">页面-</Link>
        5. 使用Route组件配置路由规则和要展示的组件（路由出口） 

            const First = () => <p>页面一的内容</p>
            <Router>
                <div className='app'>
                    <Link to="/first">页面-</Link>
                    <Route path="/first" component={First}></Route>
                </div>
            </Router>
#### 编程式导航

        class Logiin extends React.component {
            handleLogin = () => {
                this.props.history.push('/home')
            }
            render() {
                return(
                    // ...
                )
            }
        }
#### 默认路由

        <Route path="/" component={home} />
#### 模糊匹配模式

模糊匹配模式下：
    1. '/' 会被所有的pathName匹配上
    2. '/first'也会被'/first/a'匹配上

#### 精确匹配模式
目的：为了解决一些页面不希望模糊匹配
解决方法：给Route组件添加exact属性，让其变为精确匹配模式

### react 钩子函数
1. useRef： 用来获取DOM元素
   - 只能用于函数组件或者自定义钩子
   - 钩子函数只能在函数组件中调用

### Redux

1. 引入Redux
2. 创建reducer整合函数
3. 通过reducer对象创建store
4. 对store中的state进行订阅
5. 通过dispatch派发state的操作指令

        function reducer(state, action) {
            <!-- 也可以指定默认值：state=1
            一般来说state一般为一个对象: state ={} 例如：state={count: 1} -->
            swith (action.type ) {
                case 'ADD': 
                    return state ++
                case 'MINUTE'
                    return state -- 
                case 'ADD_N'
                    return state + action.payload
                default
                    return state
            }
        }

        const store = Redux.createStore(reducer, 1) // 这个1是state的默认值
        
        store.subscirbe(()=> {
            // 这里写数据改变后要触发的逻辑
            console.log(store.getState())
        })

        addBtn.addEventListener('click', ()=> {
            store.dispatch({type: 'ADD'})
        })

        addBtn.addEventListener('click', ()=> {
            store.dispatch({type: 'ADD_N', payload: 5})
        })
* redux提供了函数combineReducer来将多个reducer进行合并

        const reducer = combineReducer({
            a: aReducer,
            b: bReducer
        })

        const store = Redux.createStore(reduce)

#### Redux Toolkit(RTK)

安装： 
        yarn add react-redux @reduxjs/toolkit
使用：
        import { createSlice, configureStore } from '@reduxjs/toolkit'
        //  创建reducer的切片
        const stuSlice = createSlice({
            name: 'stu', // 用来自动生成action的type
            initialState: {
                name: zhangsan,
                age: 18,
                gender: 男,
                address: '西安'
            }, // state的初始值
            reducers: { // 指定state的操作，直接在对象中添加方法
                setName(state, action) {
                    // 可以通过不同的方法来指定state的不同操作
                    // 两个参数：state 是传统state的一个代理对象 可以直接操作
                    state.name = '李四'
                },
                setAge(state, action) {
                    state.age = 20
                }
            }
        })
        // 切片会自动生成action
        // actions中存储的是slice自动生成的action创建器（函数），调用函数后会自动创建action对象
        // action对象的结构{type:name/函数名, payload:函数的参数}
        const {setName, setAge } = stuSlice.actions

        创建store，用来创建store对象，需要一个配置对象作为参数
        
        const store = configureStore({
            <!-- reducer: stuSlice.reducer // 单个 -->
            reducer: { // 多个
                student: stuSlice.reducer
            }
        })
        export default store
         
### react hooks (16.8版本以上)
hooks 不用写class

1. useState

        function exmple() {
            const [count, setCount] = useState(0)
        }
2. useEffect: 替代生命周期,数据改变时触发,

        useEffect(()=> {
            console.log('重新render')
            return () => {
                console.log('componentWillUnmount')
            }
        }, []) // 第二个参数指定了在那些值发生改变后触发componentWillUnmount。不写即表示组件销毁才触发
3. useReducer

        const [count, dispatch] = useReducer((state, action) => {
            switch(action.type) {
                case 'ADD':
                    return state + 1
                ...
                default:
                    return state
            }
        })

        <button onClick={()=> dispatch({type: 'ADD'})}>increment</button>
4. useContext(): 替代createContext中的consumer

    之前我们用Consumer来获取Provider里的值：

        <Consumer>
            {data => <span>{ data }</span>}
        </Comsumer>
    
    用useContext()为：

        const { data }= useContext(value)