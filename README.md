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


