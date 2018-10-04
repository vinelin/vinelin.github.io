---
layout:     post
title:      "JavaScript 关于闭包的有趣例子"
subtitle:   "不用数字进行计算"
date:       2018-09-29 00:00:00
author:     "Vinelin"
header-img: "img/post-bg-1.jpg"
tags:
    - JavaScript
    - 想法
---

## 脑洞大开--使用函数进行计算

最近在学习JavaScript，在闭包的讲解环节遇到了这样的一个例子。
"很久很久以前，有个叫阿隆佐·邱奇的帅哥，发现只需要用函数，就可以用计算机实现运算，而不需要0、1、2、3这些数字和+、-、\*、这些符号。"

代码如下:

    'use strict';
    // 定义数字0:
    var zero = function (f) {
    return function (x) {
        return x;
    }
    };

    // 定义数字1:
    var one = function (f) {
    return function (x) {
        return f(x);
    }
    };

    // 定义加法:
    function add(n, m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
    }
    // 计算数字2 = 1 + 1:
    var two = add(one, one);

    // 计算数字3 = 1 + 2:
    var three = add(one, two);

    // 计算数字5 = 2 + 3:
    var five = add(two, three);

    // 你说它是3就是3，你说它是5就是5，你怎么证明？

    // 呵呵，看这里:

    // 给3传一个函数,会打印3次:
    (three(function () {
    console.log('print 3 times');
    }))();

    // 给5传一个函数,会打印5次:
    (five(function () {
    console.log('print 5 times');
    }))();

运行结果如下:

    print 3 times
    print 3 times
    print 3 times
    print 5 times
    print 5 times
    print 5 times
    print 5 times
    print 5 times
---

## 个人分析
说这是一个程序问题，不如说是一个逻辑问题。
首先我们要知道下面函数中的f和x可有可无,为了与上面执行结果联系起来,你不妨把x都看为空,即没有传入参数.
我们来看zero函数
` var zero = function (f) {
    return function (x) {
        return x;
    }
    };`
当zero执行一次时即zero(f);时，返回值为``function (x) {
        return x;
    }``
若把返回值再次执行即zero(f)(x);返回值为x;
- - -
再来看one函数
` var one = function (f) {
    return function (x) {
        return f(x);
    }
    };`
当one执行一次时即one(f);返回值为`function (x) {
        return f(x);
    }`
若把返回值再次执行即one(f)(x);返回值为f(x);
这说明了执行了一次函数f(x)而f为第一次执行传入的参数而x为继续执行传入的参数。
最关键也是最奇妙的是加法函数的定义:

    function add(n, m) {
        return function (f) {
            return function (x) {
                return m(f)(n(f)(x));
            }
        }
    }
根据这个函数的定义来具体看看`var two = add(one,one);`
让我们回顾一下one(f);得到的是一个函数，该函数的返回值为f(x);one(f)(x)得到f(x);
现在 m==one,n==one;
add(one,one)也就是two函数的返回值为

       function (f) {
            return function (x) {
                return one(f)(one(f)(x));
            }
        }
注意一下这里`return one(f)(one(f)(x));`
对于一个one函数来说传入参数第一次为f,第二次为one(f)(x);
对于第二个one函数来说传入参数第一次为f,第二次为x;
上文已经得出了执行one(f)(x);会得到f(x);
所以代码其实可以看成

       function (f) {
            return function (x) {
                return one(f)(f(x));
            }
        }

这时我们如例子里面给three和five传递一个函数参数一样，给two传递一个函数参数`function () {console.log('print 2 times')`
把这个函数记为p函数,p()为输出*print 2 times*
执行two(p)();
由于第二次没有传入参数,x为空。
先看two(p);会发生什么
代码就变成了

    function (p) {
        return function () {
            return one(p)(p());
        }
    }
最后得到`function () {
                return one(p)(p());
            }`

返回值再次执行也就是`function () {
                return one(p)(p());
            }();`

得到 one(p)(p());
也就是  p(p());
内部的p()先执行p函数输出*print 2 times*,返回undefined;
然后外部变成了p(undefined);可以看成p();再次执行p函数输出*print 2 times*

以此类推可以知道为什么例子里three(f)()会输出三次,five(f)()会输出五次;

---

## 问题出处

* [廖雪峰老师JavaScript教程-闭包](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143449934543461c9d5dfeeb848f5b72bd012e1113d15000#0)
