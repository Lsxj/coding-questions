**基本类型**： `null`, `undefined`, `boolean`, `string`, `number`, `symbol`(ES6新增)  
查看值的类型使用`typeof`,返回对应类型的字符串值。   
**引用类型**： `object`, `Array`, `Date`, `RegExp`, `Function`, 基本包装类型（`Boolean`, `String`, `Number`）,单体内置对象（`Global`, `Math`）  

tips: 
* typeof null; // "object"
* delete 删除数组中的元素时不会影响数组的length

---
  
JavaScript中字符串是不可变的，而数组是可变的。  
对字符串操作都是创建并返回一个新的字符串，而数组都是直接在原始值上进行操作

---
---
将类数组转换为数组：

    var arr = Array.prototype.slice.call( arguments );

    //使用ES6中内置工具
    var arr = Array.from( arguments );
---

---
JavaScript 使用的是“双精度”格式（**64**位二进制），基于IEEE 754标准。  
bug: `0.1 + 0.2 === 0.3; // false `  
解决办法：   
`Number.EPSILON`判断两个数是否相等（ES6）  
polyfill:

    if(!Number.EPSILON){
        Number.EPSILON = Math.pow(2, -52);
    }
---
---
判断一个值是否为整数  
`Number.isInteger()`(ES6)  
polyfill:

    if(!Number.isInteger){
        Number.isInteger = function(num){
            return typeof num == "number" && num % 1 == 0;
        }
    }

---
---
判断一个值是否为NaN  
`isNaN()`有bug，使用`Number.isNaN()`(ES6)  
polyfill:

    if(!Number.isNaN){
        //利用NaN != NaN的特性
        Number.isNaN = function(num){
            return n !== n;
        }
    }

---
---
简单值（标量基本类型值）总是通过**值复制**的方式来赋值/传递，包括`null`,`undefined`,字符串，数字，布尔和`symbol`  
复合值（对象[数组、封装对象]和函数），总是通过**引用复制**的方式来赋值/传递

---

使用常量形式定义正则表达式，语法简单，执行效率高，因为JavaScript引擎在代码执行前会对它们进行预编译和缓存。

---
---

判断一个对象是否为数组
*  Array.isArray()
* instanceof() == Array
* typeof() == ‘[object Array]’

---
---
伪随机算法

    arr.sort(function(a, b ){
    return 0.5 - Math.random();
    })
    
---
---

    var f = function g() {
            return 23;
        };
    typeof f; //"function"
    typeof f(); //"number"
    typeof g; //"undefined"
    typeof g(); //Uncaught ReferenceError: g is not defined(…)

