 const through = require('through2');
 const gutil = require('gulp-util');
 const analyzer = require('./lib/analyzer');
 const utils = require('./lib/utils');


module.exports = (options = {}) => {
  if (!utils.isObject(options)) {
    throw new gutil.PluginError('analyze-css', 'Options is not a Object');
  }
  // options = options || {};
  function analizeCss(file, enc, callback) {
    // Don't do nothing if don't have contents
    if (file.isNull()) {
      cb(null, file);
    } else if (file.isStream()) {
      this.emit('error', new gutil.PluginError('analyze-css', 'Stream content is not supported'));
    } if (file.isBuffer()) {
      analyzer(file, options, callback)
    }
  }

  return through.obj(analizeCss);
};