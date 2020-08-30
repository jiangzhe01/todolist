## ToDoList

### 技术栈

前端都基于typescript，使用tslint规范代码

后端使用epress 提供一个简易的 http 服务器, 并将所有路由定位到入口 routes/index.js 处理. 数据库是 mysql, 相关配置文件在config/default.js

博客基于 react 框架, ui 使用antd, 使用reqwest请求后端数据. 

### Usage

```
因为前端和后端是分离的, 所以都需要安装相关依赖:
cd todolist
npm i
cd todolist/server
npm i

启动服务器(todolist/server)
node index.js

运行项目
npm run dev
```

### 目录结构

![image-20200829215441814](C:\Users\11078\AppData\Roaming\Typora\typora-user-images\image-20200829215441814.png)

### todolist界面

![image-20200829215540828](C:\Users\11078\AppData\Roaming\Typora\typora-user-images\image-20200829215540828.png)

