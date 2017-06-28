module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31"]
        // },
        'postcss-cssnext':{},
        'postcss-pxtorem': {
            rootValue: 16,
            unitPrecision: 6,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            selectorBlackList :[/^body$/,/^html$/],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0  
        },
        'postcss-url':{
            url: 'rebase'
        }
    }
}