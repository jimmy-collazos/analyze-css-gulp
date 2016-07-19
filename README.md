# analyze-css-gulp

> [analyze-css](https://github.com/macbre/analyze-css) plugin for [gulp](https://github.com/wearefractal/gulp)

Gulp plugin that analyze your css with analyze-css and compare the results to a user-defined benchmark.

## Usage

First, install `analyze-css-gulp` as a development dependency:

```shell
npm install --save-dev analyze-css-gulp
```

When you need proccess Object result of analyze:

```javascript
var analyzeCss = require("analyze-css-gulp");

gulp.src("./src/*.css")
    .pipe(analyzeCss())
    .pipe(myTaskProccessResult());

```

If you need export result of analyze (JSON format) and need same source file in next pipe:
```javascript
var analyzeCss = require("analyze-css-gulp");

gulp.src("./src/*.css")
    .pipe(analyzeCss({ outDiretory: "./dist" }))
    .pipe(myCssTask());
```

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
