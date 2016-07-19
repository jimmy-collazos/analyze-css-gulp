var through = require('through2'),
  gutil = require('gulp-util'),
  analyzer = require('analyze-css'),
  fs = require('fs'),
  path = require('path');

var metricFilterMap = function(offender) {
    var position = offender.position && offender.position.start;
    return offender.message + (position ? ' @ ' + position.line + ':' + position.column : '');
  };
var metricFilter = function(metricName) {
    this.offenders[metricName] = this.offenders[metricName].map(metricFilterMap);
  };

module.exports = function (options) {
  'use strict';
  if (typeof options !== 'undefined' && Object.prototype.toString.call(options) !== '[object Object]') {
    throw new gutil.PluginError('analyze-css', 'Options is not a Object');
  }
  options = options || {};
  function analizeCss(file, enc, callback) {
    var _analyzeAndChangeContent = function(err, result) {
        file.contents = new Buffer(JSON.stringify(result, null, 2));
        callback(null, file);
      },
      _saveErrorCallback = function(err) {
        if(err) {
            return console.log(err);
        }
      },
      _analyzeAndSaveReport = function(err, result) {
        var filename = path.basename(file.path, '.css'),
          filepath = path.join(options.outDiretory, filename + '.json');

        if (typeof result.offenders !== 'undefined') {
          Object.keys(result.offenders).forEach(metricFilter, result);
        }
        fs.writeFile(filepath, JSON.stringify(result, null, 2), _saveErrorCallback);
        callback(null, file);
      };

    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error',
        new gutil.PluginError('analyze-css', 'Stream content is not supported'));
      return callback();
    }

    if (file.isBuffer()) {
      new analyzer(String(file.contents), options, options.outDiretory ? _analyzeAndSaveReport : _analyzeAndChangeContent);
    } else {
      return callback();
    }
  }

  return through.obj(analizeCss);
};
