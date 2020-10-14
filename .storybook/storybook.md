##1.初始化 cli
npx sb init

##2.addons
捕获组件事件，将结果打印出来，用来记录事件日志
'@storybook/addon-actions/register'

链接插件可以用来创建在 storybook 之间导航的链接
@storybook/addon-links/register'

story 信息展示，包含当前展示的组件的代码（实时更新），当前组件 propTypes 详细说明
@storybook/addon-info

自动生成文档
react-docgen(storybook 自带)
react-docgen-typescript-loader

##3.addons 使用
a.全局设置在 config 设置
b.在单个组件的 stories 中设置

4.添加 md 文档注释的两种方法
a.addParameters
b.storybook 会将文件中注释添加到页面中
