# MpEvent

一个微信小程序简单易用的事件订阅-发布框架。

通过简单明了的事件发布-订阅机制，可以简化多页面、多兄弟组件之间的数据传递与事件通知。

## 如何使用

### 🚀 安装  

在使用 `MpEvent` 的地方引入 `mp-event`。例如:

```js
import MpEvent from './mp-event.js'
```

### 发布事件
```js
MpEvent.pub('event-name', {
  data: 'hello world'
})
```

### 订阅事件  
```js
MpEvent.sub('event-name', this, (data) => {
  console.log(data)
})
```
其中，`this` 就是当前组件或页面的实例。当`event-name`事件发布时，会触发 `this` 对应的回调方法。

### 取消订阅
```js
MpEvent.unSub('event-name', this)
```