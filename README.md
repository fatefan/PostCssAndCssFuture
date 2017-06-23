# 介绍 PostCSS
> PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more

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
在__:root__选择器内定义一段css代码，然后在其他选择器中使用这段代码。
