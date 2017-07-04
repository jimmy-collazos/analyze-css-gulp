const analyzerCss = require('analyze-css');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = analyzer;

function analyzer(file, options, callback) {
  let contents = String(file.contents);
  let analyzerCallback = options.outDiretory ? _analyzeAndSaveReport : _analyzeAndChangeContent;
  return new analyzerCss(contents, options, analyzerCallback);

  function _analyzeAndChangeContent(err, result) {
    file.contents = new Buffer(utils.stringify(result));
    callback(null, file);
  }

  function _analyzeAndSaveReport(err, result) {
    if(err) throw err;

    if (utils.isObject(result.offenders)) {
      Object.keys(result.offenders).forEach(metricFilter, result.offenders);
    }
    fs.writeFile(
      buildOtDiretory(file, options.outDiretory), 
      utils.stringify(result), 
      err => {
        if(err) throw err;
      });
    callback(null, file);
  }
}

function buildOtDiretory(fileOrigin, outDiretory) {
  let filename = path.basename(fileOrigin.path, '.css');
  let filepath = path.join(outDiretory, filename + '.json');
  return filepath;
}

function metricFilterMap(offender) {
  var position = offender.position && offender.position.start;
  return offender.message + (position ? ' @ ' + position.line + ':' + position.column : '');
}

function metricFilter(metricName) {
  this[metricName] = this[metricName].map(metricFilterMap);
};
