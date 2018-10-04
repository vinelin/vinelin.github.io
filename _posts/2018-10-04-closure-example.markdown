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

---

## 问题出处

* [廖雪峰老师JavaScript教程-闭包](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143449934543461c9d5dfeeb848f5b72bd012e1113d15000#0)
