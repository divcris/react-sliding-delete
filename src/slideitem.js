import * as React from 'react';
import './style.css';

let myself = -1;
let hasShowDel = false;

export class RSDelete extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        let classValue = 'item-container ' + this.props.class;
        let delClass = 'labelAClass default-del '+ this.props.delClass;
        return <div className={classValue}>
             {this.props.rightBtn.map((item, index) => {
                let labelClass = `labelAClass labelAClass-${index}`
                return <div className={labelClass} onClick={this.props.action[index] ? e => this.props.action[index](myself) : null}>{item.text}</div>
            })}
            <div className={delClass} onClick={this.props.defaultAction? this.props.defaultAction : null}>删除</div>
            {this.props.children}
        </div>
    }
}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// 抛出删除事件， 可供调用者在自己的逻辑中取调用
export const defaultAction = e => {
    let container = e.target.parentNode.parentNode;
    container.removeChild(container.children[myself]);
}

export const loadTouchEvent = () => {
    let currentX, currentY, prevX, prevY, direction, sliderButton, sliderButtonWidth, sliderDomCls;

    sliderButton = document.getElementsByClassName('labelAClass')[0];
    sliderButtonWidth = sliderButton.offsetWidth;
    let sumBtnWidth = 0;
    let itemContianer = document.getElementsByClassName('item-container')[0];
    for( let i=0; i < itemContianer.children.length; i++ ) {
        if (hasClass(itemContianer.children[i],'labelAClass')) {
            sumBtnWidth = sumBtnWidth + itemContianer.children[i]['offsetWidth'];
        }
    }

    // 设置父容器overflow横向不允许滑动
    sliderButton ? sliderButton.parentNode.parentNode['style'].overflowX = 'hidden' : null;

    let sliderDom = sliderButton ? sliderButton.parentNode.children : null;
    sliderDomCls = sliderButton ? sliderDom[sliderDom.length - 1].classList[0] : null;

    if (!sliderDomCls && sliderDom) {
        sliderDom.className = 'slider-content';
        sliderDomCls = 'slider-content';
    }

    if (sumBtnWidth) {
        sliderButtonWidth = sumBtnWidth;
    }

    // touchend 的事件回调函数
    let touchEndFunction = (e) => {
        let currentComponent = e.target;

        if (!hasClass(currentComponent, sliderDomCls)) return;

        if (direction === 'left') {
            currentComponent.style.left = `-${sliderButtonWidth}px`;
            hasShowDel = true // 此时删除按钮已经出现
            myself = Array.prototype.slice.call(currentComponent.parentNode.parentNode.children).indexOf(currentComponent.parentNode);
        } else if (direction === 'right') {
            currentComponent.style.left = '0px';
        }

        prevX = undefined;
        prevY = undefined;
        currentX = undefined;
        currentY = undefined;

        currentComponent.style.transition = '0.25s all ease-in';


        // 每次这个事件调用之后移除对应的事件，免得内存泄漏
        currentComponent.removeEventListener('touchend', touchEndFunction);
        currentComponent.touchendExist = undefined;
    }

    // 判断是否当前已有左移滑动删除状态的item，有则关闭它
    let judgeShow = (currentComponent) => {
        let index = Array.prototype.slice.call(currentComponent.parentNode.parentNode.children).indexOf(currentComponent.parentNode);
        let parentList;
        if (index != myself) {
            hasShowDel = false;
            parentList = currentComponent.parentNode.parentNode;
            // 处理已经出现删除按钮的逻辑
            Array.prototype.slice.call(Array.prototype.slice.call(parentList.children)[myself].children)[currentComponent.parentNode.children.length-1]['style'].left = '0';
        }
    }

    document.body.addEventListener('touchmove', e => {
        let currentComponent = e.target;

        // 判断是否是目标的对象
        if (!hasClass(currentComponent, sliderDomCls)) return;


        currentX = e.touches[0].pageX;
        currentY = e.touches[0].pageY;
        currentComponent['style'].transition = '';

        let currentComponentOffset = currentComponent['offsetLeft'];

        if (prevX) {
            if (currentComponentOffset <= 0 && currentComponentOffset >= -sliderButtonWidth) {
                let angle = getAngle(currentX, currentY, prevX, prevY)
                if (-40 < angle && angle < 40) {
                    direction = 'left';
                    currentComponent['style'].left = (currentComponentOffset - 1) + 'px';
                    if (hasShowDel) {
                        judgeShow(currentComponent);
                    }
                } else {
                    direction = 'right';
                    currentComponent['style'].left = (currentComponentOffset + 1) + 'px';
                }
            }
        }

        prevX = currentX;
        prevY = currentY;

        // 判断是否绑定了`touchend`事件，适用组件里面的一个属性类记录状态
        if (!currentComponent['touchendExist']) {
            currentComponent.addEventListener('touchend', touchEndFunction);
            currentComponent['touchendExist'] = true;
        }
    }, { passive: true });

}

//计算角度
function getAngle(px1, py1, px2, py2) {
    //两点的x、y值
    let x = px2 - px1;
    let y = py2 - py1;
    let hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    //斜边长度
    let cos = x / hypotenuse;
    let radian = Math.acos(cos);
    //求出弧度
    let angle = 180 / (Math.PI / radian);
    //用弧度算出角度
    if (y < 0) {
        angle = -angle;
    } else if ((y == 0) && (x < 0)) {
        angle = 180;
    }
    return Number(angle);
}

// 计算两点距离
function getRange(px1, py1, px2, py2) {
    return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
}
