import style from './style.postcss';
import a from './a.js';
import React, {Component} from 'react';
import {render} from 'react-dom';
// document.getElementById('root').className = style.foo;
a();

class HelloWorld extends Component  {
    constructor () {
        super();
    }
    render () {
            return (
                <div>
                    <h1 className={style.hw}>Hello PostCSS！</h1>
                    <span className={style.img}></span>
                </div>
            )
    }
}
render(<HelloWorld />,document.getElementById('app'));