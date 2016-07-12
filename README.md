# analyze-css-gulp

> analyzeCss plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `analyze-css-gulp` as a development dependency:

```shell
npm install --save-dev analyze-css-gulp
```

Then, add it to your `gulpfile.js`:

```javascript
var analyzeCss = require("analyze-css-gulp");

gulp.src("./src/*.ext")
	.pipe(analyzeCss({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### analyzeCss(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/analyze-css-gulp
[npm-image]: https://badge.fury.io/js/analyze-css-gulp.png

[travis-url]: http://travis-ci.org/jimmy-collazos/analyze-css-gulp
[travis-image]: https://secure.travis-ci.org/jimmy-collazos/analyze-css-gulp.png?branch=master

[coveralls-url]: https://coveralls.io/r/jimmy-collazos/analyze-css-gulp
[coveralls-image]: https://coveralls.io/repos/jimmy-collazos/analyze-css-gulp/badge.png

[depstat-url]: https://david-dm.org/jimmy-collazos/analyze-css-gulp
[depstat-image]: https://david-dm.org/jimmy-collazos/analyze-css-gulp.png
