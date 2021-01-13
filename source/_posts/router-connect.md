---
title: 浅谈家中路由器组网方式
date: 2020-05-10 01:23
---
本文写于更换新的路由器时，临时起意。
一来梳理一下路由器设置模式的差异，二来复习一下计网知识。

## 背景
* 光猫有两种模式，默认为**路由模式**（此时光猫拨号上网，另外一种为桥接模式——由连接的设备自行拨号）
* 开启路由模式的光猫可作为下文中的**一级路由**
* 自行购买的路由下文中称为**二级路由**或**副一级路由**
* 一级路由默认开启**DHCP**
* W为WAN口，L为LAN口
* 子网掩码255.255.255.0
* 图中的**无线**情况均可用**有线**替换（前提是有空闲LAN口）

## 情形一：直接使用一级路由
![situation one](https://cdn.jsdelivr.net/gh/vinelin/blog-resources@master/img/router-connect/1.png)

#### 特点
> 1. 设备在同一网络
> 2. 一次NAT：外网IP->192.168.1.XXX

## 情形二：二级路由切换为中继模式
### 有线中继
![situation two-one](https://cdn.jsdelivr.net/gh/vinelin/blog-resources@master/img/router-connect/2.png)

### 无线中继
![situation two-two](https://cdn.jsdelivr.net/gh/vinelin/blog-resources@master/img/router-connect/3.png)


#### 特点
> 1. 设备在同一网络
> 2. 一次NAT：外网IP->192.168.1.XXX
> 3. 该方式扩展了原有网络

## 情形三：二级路由切换为路由模式作为 二级路由（也有地方称为 无线访问点AP）
![situation three](https://cdn.jsdelivr.net/gh/vinelin/blog-resources@master/img/router-connect/4.png)

#### 特点
> 1. 设备不在同一网络，由连接的路由决定
> 2. 两次NAT：外网IP->192.168.1.XXX->192.168.31.XXX
> 3. 该方式扩展了原有网络

## 情形三：二级路由切换为路由模式作为 交换机
![](https://cdn.jsdelivr.net/gh/vinelin/blog-resources@master/img/router-connect/5.png)
#### 特点
> 1. 设备在同一网络
> 2. 一次NAT：外网IP->192.168.1.XXX
> 3. 该方式扩展了原有网络
#### 与中继模式对比
> 1. 中继模式接在WAN口，交换机模式接在LAN口
> 2. 中继模式可进入路由器设置界面，交换机模式则不可

## 补充：光猫切换为桥接模式
参考情形一.但一级路由消失变为ISP，二级路由变为一级路由
