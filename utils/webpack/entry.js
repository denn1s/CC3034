document.body.innerHTML += 'Hello from entry.js <br />'

// mkdir js

var lib = require('./js/lib.js')

document.body.innerHTML += lib.hello

// mkdir css
// nano styles.css

var styles = require('./css/styles.css')

// npm install css-loader

var styles = require('css-loader!./css/styles.css')

console.log(styles.toString())

document.body.innerHTML += '<style>' + styles + '</style>'

require('style-loader!css-loader!./css/styles.css')

// --module-bind 'css=style!css'

require('./css/styles.css')

// webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'

npm install webpack-dev-server -g

// http://127.0.0.1:8080/webpack-dev-server/bundle
