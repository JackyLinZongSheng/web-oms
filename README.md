开发环境

首先，请安装 NodeJS。NodeJS 是一个 JS 执行环境，umi 基于 JS 编写，并且需要在开发机上运行，所以依赖于它。

安装完成后，执行下面的命令确认是否安装成功。

node -v

npm -v

在 umi 中我们采用了一些 NodeJS 的新特性，请确保你的 NodeJS 版本大于等于 8.5.0。


全局安装umi

npm install -g umi

添加 umi-plugin-react 插件
umi 是一个可插拔的企业级 react 应用框架，它的很多功能都是通过插件实现。尤其是 umi 官方的 umi-plugin-react 这个插件集成了常用的一些进阶的功能，需要添加该插件集到项目中。

 npm install umi-plugin-react --save-dev安装该插件集。

.gitignore(分支代码里已添加，可稍作检查即可)
npm 安装的依赖会被默认安装到项目的 node_modules 目录下。这个目录通常是不需要提交到代码仓库中的。添加 .gitignore 文件到项目根目录中，避免将不必要的代码提交到 git 仓库中。

.gitignore 如下：

node_modules
dist
.umi

其中 .umi 是 umi 在开发过程中产生的临时入口文件，便于开发调试，同样也不需要提交到代码仓库中。dist 是构建出来的产物，通常也不需要提交。

构建
执行 umi build，
cp src/page/loginSuccess.html dist/    (用于单点登录静态中转页面跳转)

构建产物默认生成到 ./dist 下







