/**
 * events 的数据格式
 * {
 *    eventName: {
 *        subscriber1<Object>: callback1<Function>
 *        subscriber2<Object>: callback2<Function>
 *        ...
 *    },
 *   ...
 * }
 */
const events = new Map();

/**
 * 订阅消息
 * @param {String} key 消息标识
 * @param {Object} subscriber 消息订阅者
 * @param {Function} callback 回调函数
 */
function sub(key, subscriber, callback) {
  let event = events.get(key);
  const hasEvent = !!event;
  if (!hasEvent) event = new Map();
  event.set(subscriber, callback);
  if (!hasEvent) events.set(key, event);
  console.log("mp-event: ", `sub a event: ${key}`);
}

/**
 * 发布消息
 * @param {String} key
 * @param {Object} data
 */
function pub(key, data) {
  const subscribes = events.get(key);
  if (!subscribes) return;

  // 如果有人订阅，则依次执行。先订阅先执行。
  // 执行顺序由 Map 的特性决定：
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
  for (const subscribe of subscribes) {
    const [subscriber, callback] = subscribe;
    callback.call(subscriber, data);
  }
  console.log("mp-event: ", `pub a event: ${key}`);
}

/**
 * 取消消息订阅
 * @param {String} key
 * @param {Object} subscriber
 */
function unSub(key, subscriber) {
  if (events.has(key)) {
    const subscribes = events.get(key);
    subscribes.delete(subscriber);
  }
  console.log("mp-event: ", `unSub a event: ${key}`);
}

module.exports = {
  sub: sub,
  pub: pub,
  unSub: unSub,
};
