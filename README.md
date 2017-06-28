# 介绍 PostCSS
> PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more

![](https://www.smashingmagazine.com/wp-content/uploads/2015/12/post-css-opt.png)  
[PostCSS](http://postcss.org/)是个平台，在这个平台上你可以找到各种对CSS进行编译转换的插件。通过使用插件你可以达到CSS预编译器的效果。但PostCSS的用途不是只是一个CSS预处理器，它是个CSS生态系统。

## 使用
PostCSS可以很容易于现代构建工具结合，我们以webpack为例子。

	yarn add postcss-loader webpack css-loader style-loader extract-text-webpack-plugin -D
webpack.config.js
	
	module: {
		rules: [
			{
				test:/\.postcss$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader','postcss-loader']
				}),
				exclude: /node_modules/
			}
		]
	}
postcss.config.js -- postcss配置文件。  
完成对CSS各种转换依赖的是postcss各种插件。我们可以在postcss.config.js定义我们需要使用的插件。

	module.exports = {
    		plugins: {
        		'autoprefixer': {
            			browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31"]
      	  		}
    		}
	}

## 插件
PostCSS上面各种强大的插件，使得它无所不能。它可以支持你在代码中使用未来CSS语法，就像Babel支持你写未来JS一样。你还可以用它来压缩，debug代码。
###postcss-cssnext
> Discover the future of CSS

加载postcss-cssnext插件，你就可以使用CSS4语法了。  
#### custom properties & var()
在__:root__选择器内定义变量，在其它选择器中该变量使用。  

	：root {
		--defaultSize: 14px;
	}
	div {
		font-size: var(--defaultSize); // 将要使用的变量放入 var()中。
	}
#### custom properties set & apply
在__:root__选择器内定义一段css代码，然后在其他选择器中使用这段代码。

	：root {
		--vertical-middle: {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.module {
		@apply --vertical-middle;
	}
#### custom selectors （@custom-selector）
你可以创建自己的选择器

	
	@custom-selector :--button button, .btn;
	@custom-selector :--enter :hover, :focus;
	:--button {
  		padding: 10px;
  		background-color: red;
	}
	:--button:--enter {
  		background-color: pink;
	}
#### nesting
嵌套选择器

	a {
		font-size: var(--fontSize);
		/* 直接嵌套 ‘&’ 嵌套选择符 它代表父级规则*/
		& span {
			color: white;
		}

		/* @nest 嵌套选择符声明 使用了@nest符号的选择器声明中必须包含嵌套选择器 */
		@nest span & {
			color: blue;
		}

		/* media query automatic nesting */
		@media (min-width: 30em) {
			color: yellow;
		}
	}
	.foo {
		color: red;
		@nest .bar {
			color: blue;
		}
	}
	/* Invalid because there’s no nesting selector */

	.foo {
		color: red;
		@nest & .bar, .baz {
			color: blue;
		}
	}
### CSS Module
CSS Module使我们不用担心样式的Class名会冲突。在组件话开发中，我们不同组件之间有名字一样的Class，这样可能会造成样式错乱。CSS Module可以解决这个问题。
#### webpack
css-loader 自带 CSS Module功能配置方式如下：

	rules: [
		{
			test:/\.postcss$/,
			use:ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:[
					{
						loader:'css-loader',
						options:{
							modules: true
						}
					},
					'postcss-loader'
				]
			}),
			exclude: /node_modules/
		}
	]
以React为例:

	import React, {Component} from 'react';
	import {render} from 'react-dom';
	import style from './style.postcss'
	class HelloWorld extends Component {
		render () {
			return (<h1 className={style.hw}>Hello World!</h1>)
		}
	}
	render(<Hw/>,document.getElementById('app'));
结果：
!['DOM 结果'](http://imglf0.nosdn.127.net/img/Lzg4b1BvbmpvR2h6NC92VlJTU1psMlpZcTUxQ0t3ZkpLVnU2QlFtVWU0S3MwRUcwNVI0MXFBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg)

### cssnano
css代码压缩插件。
	
	yarn add postcss-cli cssnano
postcss.config.js:

	module.exports = {
		plugins: [
			require('cssnano')({
				preset: 'default',
			}),
		],
	};
webpack加载器css-loader集成了cssnano，只需把配置项 options.minimize 变为true。
### postcss-pxtorem
将‘px’转换为 ‘rem’;

	yarn add postcss-pxtorem
postcss.config.js

	module.exports = {
		plugins:{
			'postcss-pxtorem':{
				rootValue: 16,  //根元素的font-size大小。
				unitPrecision ： 6，//rem小数点最长位数。
				propList： ['font-size','line-height'], //需要进行转换的选择器
				selectorBlackList： [/^html$/,/^body$/],//不进行转换的选择器 
				replace: true, //是否替换 px字段值，
				mediaQuery：false， //是否替换 媒体查下的条件
				minPixelValue： 0 // 转换的最小值
			}
		}
	}
### postcss-url
对样式文件的图片进行处理。添加路径,base64,复制。

	yarn add postcss-url
postcss.config.js

	module.exports = {
		plugins: {
			'postcss-url':{
				url: 'inline', //将图片转换为base64
			}	
		}
	}