import style from './style.postcss';
import a from './a.js'
console.log('hello postcsss');
document.getElementById('app').className = style.foo;
console.info(style.foo);
a();