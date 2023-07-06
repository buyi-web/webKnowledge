
@import "https://haogeshuohuanihaohaoting.github.io/static/mdCreateMenu.js"

[toc]

# html与浏览器

## 介绍一下你对语义化的理解

1. html语义化让页面内容结构化，结构清晰，便于阅读维护
2. 在没有css的作用下也有文档格式显示。
3. 搜索引擎爬虫依赖于HTML标记，来确定上下文和各个关键字的权重，利于SEO。

## Doctype 作用？标准模式与兼容模式各有什么区别?

DOCTYPE 是用来声明文档类型和 DTD 规范的。 <!DOCTYPE html>声明位于 HTML 文档中的第一行，不是一个 HTML 标签，处于 html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的排版 和 JS 运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

在 HTML4.01 中<!doctype>声明指向一个 DTD，由于 HTML4.01 基于 SGML，所以 DTD 指定了标记规则以保证浏览器正确渲染内容 HTML5 不基于 SGML，所以不用指定 DTD


## 页面导入样式时，使用 link 和@import 有什么区别？

- link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而@import 是 CSS 提供的，只能用于加载 CSS;
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
- import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
- link 支持使用 js 控制 DOM 去改变样式，而@import 不支持;

## html5变化

- [新的语义化元素](https://www.w3school.com.cn/html/html5_new_elements.asp)
  - header footer nav main article section
  - 删除了一些纯样式的标签

- [表单增强](http://caibaojian.com/html5/form.html)
  - 各个浏览器表现的效果不同，兼容性问题

- 新的API
  - 离线 （applicationCache ）
  - 音视频 （audio, vidio）
  - 图形 （canvans）
  - 实时通信（websoket）
  - 本地存储（localStorage, indexDB）
  - 设备能力（地图定位，手机摇一摇）

## 为什么我们要弃用 table 标签？

table 的缺点在于服务器把代码加载到本地服务器的过程中，本来是加载一行执行一行，但是 **table 标签是里面的东西全都下载完之后才会显示出来**，那么如果图片很多的话就会导致网页一直加载不出来，除非所有的图片和内容都加载完。如果要等到所有的图片全都加载完之后才显示出来的话那也太慢了，所以 table 标签现在我们基本放弃使用了。

## [HTML5 离线缓存-manifest简介](https://yanhaijing.com/html/2014/12/28/html5-manifest/)

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

## iframe 有那些缺点？

- iframe 会阻塞主页面的 Onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO;
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用 iframe 之前需要考虑这两个缺点。如果需要使用 iframe，最好是通过 javascript

动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。
