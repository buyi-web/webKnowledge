# 从输入 URL 到页面加载完成的过程

1. 在浏览器地址栏输入 URL
2. 判断是否有永久重定向(301)
   - 如果有，直接跳转到对应 URL
3. 浏览器查看资源是否有强缓存，有则直接使用，如果是协商缓存则需要到服务器进行校验资源是否可用
   - 检验新鲜通常有两个 HTTP 头进行控制Expires和Cache-Control：
     - HTTP1.0 提供 Expires，值为一个绝对时间表示缓存新鲜日期
     - HTTP1.1 增加了 Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
4. 浏览器解析 URL获取协议，主机，端口，path
5. 浏览器组装一个 HTTP（GET）请求报文
6. DNS 解析，查找过程如下：
   1. 浏览器缓存
   2. 本机缓存
   3. hosts 文件
   4. 路由器缓存
   5. ISP DNS 缓存
   6. DNS 查询（递归查询 / 迭代查询）
7. 端口建立 TCP 链接，三次握手如下：
   1. 客户端发送一个 TCP 的SYN=1，Seq=X的包到服务器端口
   2. 服务器发回SYN=1， ACK=X+1， Seq=Y的响应包
   3. 客户端发送ACK=Y+1， Seq=Z
8. TCP 链接建立后发送 HTTP 请求
9.  服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用 HTTP Host 头部判断请求的服务程序
10. 服务器检查HTTP 请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码
11. 处理程序读取完整请求并准备 HTTP 响应，可能需要查询数据库等操作
12. 服务器将响应报文通过 TCP 连接发送回浏览器
13. 浏览器接收 HTTP 响应，然后根据情况选择关闭 TCP 连接或者保留重用，关闭 TCP 连接的四次挥手如下：
    1. 主动方发送Fin=1， Ack=Z， Seq= X报文  
    2. 被动方发送ACK=X+1， Seq=Z报文
    3. 被动方发送Fin=1， ACK=X， Seq=Y报文
    4. 主动方发送ACK=Y， Seq=X报文
14. 浏览器检查响应状态吗：是否为 1XX，3XX， 4XX， 5XX，这些情况处理与 2XX 不同
15. 如果资源可缓存，进行缓存
16. 对响应进行解码（例如 gzip 压缩）
17. 根据资源类型决定如何处理（假设资源为 HTML 文档）
18. 解析 HTML 文档，构件 DOM 树，下载资源，构造 CSSOM 树，执行 js 脚本，这些操作没有严格的先后顺序，以下分别解释
19. 构建 DOM 树：
    1.  Tokenizing：根据 HTML 规范将字符流解析为标记
    2.  Lexing：词法分析将标记转换为对象并定义属性和规则
    3.  DOM construction：根据 HTML 标记关系将对象组成 DOM 树
20. 解析过程中遇到图片、样式表、js 文件，启动下载
21. 构建CSSOM 树
    1.  Tokenizing：字符流转换为标记流
    2.  Node：根据标记创建节点
    3.  CSSOM：节点创建 CSSOM 树
22. 根据 DOM 树和 CSSOM 树构建渲染树
    1.  从 DOM 树的根节点遍历所有可见节点，不可见节点包括：1）`script,meta`这样本身不可见的标签。2)被 css 隐藏的节点，如`display: none`
    2.  对每一个可见节点，找到恰当的 CSSOM 规则并应用
    3.  发布可视节点的内容和计算样式
23. js 解析如下：
    1.  浏览器创建 Document 对象并解析 HTML，将解析到的元素和文本节点添加到文档中，此时document.readystate 为 loading
    2.  HTML 解析器遇到没有 async 和 defer 的 script 时，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用 document.write()把文本插入到输入流中。同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作 script 和他们之前的文档内容
    3.  当解析器遇到设置了async属性的 script 时，开始下载脚本并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器不会停下来等它下载。异步脚本禁止使用 document.write()，它们可以访问自己 script 和之前的文档元素
    4.  当文档完成解析，document.readState 变成 interactive
    5.  所有defer脚本会按照在文档出现的顺序执行，延迟脚本能访问完整文档树，禁止使用 document.write()
    6.  浏览器在 Document 对象上触发 DOMContentLoaded 事件
    7.  此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些内容完成载入并且所有异步脚本完成载入和执行，document.readState 变为 complete,window 触发 load 事件
24. 显示页面（HTML 解析过程中会逐步显示页面）

# CSS 会阻塞 DOM 解析吗？

对于一个 HTML 文档来说，不管是内联还是外链的 css，都会阻碍后续的 dom 渲染，但是不会阻碍后续 dom 的解析。在解析 css 的同时也在解析 dom，所以等到 css 解析完毕就会逐步的渲染页面了。

# 如何最小化重绘(repaint)和回流(reflow)？

重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流

以下几个操作会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型
  
解决方法：

- 需要要对 DOM 元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个 DOM 节点时，使用 DocumentFragment 创建完后一次性的加入 document，或使用字符串- 拼接方式构建好对应 HTML 后再使用 innerHTML 来修改页面
- 缓存 Layout 属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 避免用 table 布局（table 元素一旦触发回流就会导致 table 里所有的其它元素回流）
- 避免使用 css 表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx
