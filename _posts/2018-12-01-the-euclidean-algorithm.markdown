---
layout:     post
title:      "【个人翻译】欧几里得算法原理"
subtitle:   "辗转相除法"
date:       2018-12-01 09:00:00
author:     "Vinelin"
header-img: "img/post-bg-2.jpg"
tags:
    - 算法
---

## 欧几里得算法

回想一下两个整数A和B最大公约数（the Greatest Common Divisor (GCD)）的概念：A和B的最大公约数是能同时整除A和B的最大整数。

欧几里得算法是一种快速找到两个整数最大公约数（GCD）的算法。

## 算法

使用欧几里得算法计算A和B的最大公约数，即GCD(A,B)，步骤如下：

* 如果A=0，那么GCD(A,B)=B，因为GCD(0,B)=B，计算结束。
* 如果B=0，那么GCD(A,B)=A，因为GCD(A,0)=A，计算结束。
* 将A写成商余数形式，即(A = B⋅Q + R)。
* 使用欧几里得算法计算GCD(B,R)，因为GCD(A,B) = GCD(B,R)

## 举例

寻找270和192的最大公约数：

* A=270, B=192
* A ≠0
* B ≠0
* 使用长除法得到270/192 = 1余数为78。我们可以写成这种形式：270 = 192 * 1 +78
* 找出GCD(192,78)，因为GCD(270,192)=GCD(192,78)。

A=192, B=78

* A ≠0
* B ≠0
* 使用长除法得到192/78 = 2余数为36。我们可以写成这种形式：192 = 78 * 2 + 36
* 找出GCD(78,36)，因为GCD(192,78)=GCD(78,36)。

A=78, B=36

* A ≠0
* B ≠0
* 使用长除法得到78/36 = 2余数为6。我们可以写成这种形式：78 = 36 * 2 + 6
* 找出GCD(36，6)，因为GCD(78,36)=GCD(36,6)。

A=36, B=6

* A ≠0
* B ≠0
* 使用长除法得到36/6 = 6余数为0。我们可以写成这种形式：36 = 6 * 6 + 0
* 找出GCD(6，0)，因为GCD(36,6)=GCD(6,0)。

A=6, B=0
* A ≠0
* B =0，GCD(6,0)=6

**所以我们得出**

GCD(270,192) = GCD(192,78) = GCD(78,36) = GCD(36,6) = GCD(6,0) = 6

**GCD(270,192) = 6**

##理解欧几里得算法

欧几里得算法使用了以下这些性质：

* GCD(A,0) = A
* GCD(0,B) = B
* **如果 A = B⋅Q + R 且 B≠0 那么 GCD(A,B) = GCD(B,R)。**（Q是一个整数，R是0到B-1之间的一个数）

前两个性质让我们能得到0与其他整数之间的最大公约数。第三个性质让我们能够解决数字更大更困难的寻找最大公约数的问题。**由第三个性质，我们可以将一个较为困难的寻找最大公约数问题转换为简单的寻找最大公约数问题。**

欧几里得算法首先通过性质三将问题简化，直到问题的条件满足性质一或性质二，从而解决问题。

我们可以通过证明这些性质来理解他们。

GCD(A,0)=A的证明如下：

* 可以整除A的最大整数是A。
* 所有整数都能整除0，因为对于任何整数C， C ⋅ 0 = 0，即0 / C = 0。
所以我们得出A必然能整除0。
* 能同时整除A和0的最大数就是A。

 同理可以证明 **GCD(0,B)=B**。

 为了证明 **GCD(A,B)=GCD(B,R)**，我们首先需要知道 **GCD(A,B)=GCD(B,A-B)**。

 ![GCD(A,B)=GCD(B,A-B)](/img/euclidean/1.png)

假设我们有三个整数 **A**，**B** 和 **C** 而且 **A-B=C**。

**证明GCD(A,B)可以整除C**

由定义可知，GCD(A,B)可以整除A。因此A必然是GCD(A,B)的倍数，我们假设 X⋅GCD(A,B)=A，X为整数。

由定义可知，GCD(A,B)可以整除B。因此B必然是GCD(A,B)的倍数，我们假设 Y⋅GCD(A,B)=B，Y为整数。

A-B=C 可以得出：

* X⋅GCD(A,B) - Y⋅GCD(A,B) = C
* (X - Y)⋅GCD(A,B) = C
* C / GCD(A,B) = X - Y

所以我们可得出GCD(A,B)可以整除C。

此证明的图示如下：

 ![X⋅GCD(A,B) - Y⋅GCD(A,B) = C](/img/euclidean/2.png)

 **证明GCD(B,C)可以整除A**

由定义可知，GCD(B,C)可以整除B。因此B必然是GCD(B,C)的倍数，我们假设 M⋅GCD(B,C)=B，M为整数。

由定义可知，GCD(B,C)可以整除C。因此C必然是GCD(B,C)的倍数，我们假设 N⋅GCD(B,C)=C，N为整数。

A-B=C 可以得出：

* B+C=A
* M⋅GCD(B,C) + N⋅GCD(B,C) = A
* A / GCD(B,C) = M + N

所以我们可以得出GCD(B,C)可以整除A。

此证明的图示如下：

 ![(M + N)⋅GCD(B,C) = A](/img/euclidean/3.png)

**下面证明GCD(A,B)=GCD(A,A-B)**

* 由定义可知，GCD(A,B)可以整除B。
* 我们已经证明GCD(A,B)可以整除C。
* 因为GCD(A,B)可以整除B和C，所以GCD(A,B)是B和C的公约数。

**GCD(A,B)必然小于等于GCD(B,C)，因为GCD(B,C)是B和C的最大公约数。**

* 由定义可知，GCD(B,C)可以整除B。
* 我们已经证明GCD(B,C)可以整除A。
* 因为GCD(B,C)可以整除A和B，所以GCD(B,C)是A和B的公约数。

**GCD(B,C)必然小于等于GCD(A,B)，因为GCD(A,B)是A和B的最大公约数。**

由于GCD(A,B)小于等于GCD(B,C)且GCD(B,C)小于等于GCD(A,B)，我们可以得出：

**GCD(A,B)=GCD(B,C)**

即：

**GCD(A,B)=GCD(B,A-B)**

 ![GCD(A,B)=GCD(B,A-B)](/img/euclidean/1.png)

 **下面证明GCD(A,B) = GCD(B,R)**

我们已经证明GCD(A,B)=GCD(B,A-B)。

因为括号内数字的顺序与最大公约数无关，所以我们也可以这样写GCD(A,B)=GCD(A-B,B)。

我们可以重复使用GCD(A,B)=GCD(A-B,B)得到以下的式子：

GCD(A,B)=GCD(A-B,B)=GCD(A-2B,B)=GCD(A-3B,B)=...=GCD(A-Q⋅B,B)

其中A= B⋅Q + R 即 A-Q⋅B=R

因此 **GCD(A,B)=GCD(R,B)**，

顺序无关所以：

**GCD(A,B)=GCD(B,R)**



---

## 原文地址

* [可汗学院-欧几里得算法](https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm)
