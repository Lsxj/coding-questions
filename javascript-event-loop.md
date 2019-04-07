众所周知， javascript是一个单线程语言。单线程也就意味着只有一个stack（调用栈），一次只能做一件事。那么又是如何实现异步操作？先来了解几个关键的术语。

## Call Stack 调用栈
![clipboard.png](https://segmentfault.com/img/bVbqSfT?w=1948&h=1396)
如图所示，在运行过程中，所有相关的变量是存于heap中，而call stack中是正在执行的代码。通过F12 developer tool 在debug模式也可以看到此时的call stack情况。下图是最简单的一种情况，函数根据调用顺序依次进入call stack，执行后再依次弹出（stack后进先出）。

![clipboard.png](https://segmentfault.com/img/bVbqYeo?w=1008&h=528)

## Task Queue
那么JavaScript是怎么实现异步的呢？重要的task queue（任务队列）来了。
一般而言，我们所理解的异步操作，都是放入task queue进行等待。如下代码所示，console.log('start')进入call stack。而setTimeout是进入task queue进行等待。这里设置的时间为0，则是立即放入task queue，⚠️ 是放入task queue而不是立即执行。
只有在call stack为空的时候，event loop会讲task queue中的任务调入call stack再执行。

```
console.log('start');

setTimeout(()=>{
    console.log('hey')
}
, 0)

console.log('end');

```
输出结果：

```
start
end
hey
```

![clipboard.png](https://segmentfault.com/img/bVEXf9?w=601&h=527)

## Macrotask
一般而言，macrotask queue就是我们常说的task queue（也有人称为message queue）。Macrotask包括了setTimeout, Dom 操作（例如onLoad), click/mouse事件绑定，fetch response这类操作。实际上这些都是浏览器提供的API，所以在执行时是有它们单独的线程去进行操作。举个例子，setTimeout()设置了2s的延迟，是浏览器设置了timer来计时，是另外的线程在等待2秒，js主线程不受影响，2s后回调函数再进入task queue。

```
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// undefined (注意此时是函数返回，因为没有设置返回值故输出undefined) 
// "this is a msg from call back"
// "this is a msg from call back1"

```

## Microtask
ES6提供了Promise来进行异步操作。为了区别开task称为microtask。同上也有一个queue （job queue）来处理microtask。job queue拥有更高的优先级。每个task结束后，都会进行perform a microtask checkpoint.也就是检查job queue是否有microtask在等待执行，根据先进先出，依次执行。

```
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});


// script start
// promise1
// promise2
// setTimeout
```

## Event loop
简单来说，event loop会检查queue是否有需要处理的task，如果call stack为空时，则会按照先进先出的顺序来处理queue中的task。而task分为microtask【Promise】和macrotask【setTimeout/DOM events/fetch】。优先处理microtask。一次event loop只会处理一次macrotask，并且是当microtask queue都处理结束后才会去处理macrotasks。

```
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```


强烈推荐大家去看 https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/ 作者用动画的形式非常形象清晰地描述了过程。


参考文章
1. [The JavaScript Event Loop][1]
2. [JavaScript Event Loop Explained][2]
3. [EventLoop | MDN][3]
4. [Tasks, microtasks, queues and schedules][4]


  [1]: https://flaviocopes.com/javascript-event-loop/
  [2]: https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4
  [3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
  [4]: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
