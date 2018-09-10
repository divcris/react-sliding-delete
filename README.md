# react-sliding-delete
用于h5移动端滑动删除

# Installation
  npm install react-sliding-delete --save
  npm i
  
# Usage
```javascript
  import {defaultAction,RSDelete, loadTouchEvent } from 'react-sliding-delete';
  import React, { Component } from 'react';
  
  const data = [
    "first",
    "second",
    "third",
    "forth",
  ]
  
  export App extends Component {
  
  componentDidMout(){
    loadTouchEvent();
  }
  
  render(){
    return (
      <div className='item-contaienr'>
          {data.map((item, index)=>{
            return <RSDelete defaultAction={defaultAction} action={[this.firstAction]} rightBtn={[{text:'del','width':'100'},{text:'更多','width':'50'}]} delClass={'del-class'} class={'test'}>
              <p className='bbbbb slider-content'>11111</p>
            </RSDelete>
          })}
        </div>
    )
  }
}
```


## 说明
  1、组件必须包含在一个容器里面，类似于例子中ClassName为item-container的容器
  
  2、要传入可删除组件的dom 类似于例子中的p标签，请加上类名是独一无二的，类似于例子汇总的'bbbbb'，方便在组件内拿到避免出错
  
  3、组件默认有删除按钮，如果想在删除按钮前面加入其他类型的按钮，可以传入rightBtn参数，然后传入对应的点击方法
  
  4、默认删除按钮的事件是defaultAction，组件库暴露出来给使用者直接使用，但是也可以自己传入默认删除按钮的点击事件，或者使用自己的删除方法。
  
  5、loadTouchEvent事件必须在dom节点渲染完以后进行绑定和调用。就如例子componentDidMount方法中进行调用或者请求数据回来以后状态值更改稳定后再进行调用
