/*global describe, it*/
'use strict';

const fs = require('fs');
const es = require('event-stream');
const should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

const gutil = require('gulp-util');
const analyzeCss = require('../');

describe('analyze-css-gulp', function () {
  describe('errors: ', function() {
    var throwTypeofOptions = function(options) {
      return function () {
        (function(){ analyzeCss(options);}).should.throw('Options is not a Object');
      };
    };
    it('should throw error if set String like a options', throwTypeofOptions('string'));
    it('should throw error if set Boolean like a options', throwTypeofOptions(true));
    it('should throw error if set Number like a options', throwTypeofOptions(1));
    it('should throw error if set Array like a options', throwTypeofOptions([]));
    it('should don`t throw error if set Object like a options', function(){
      (function(){ analyzeCss({});}).should.not.throw();
    });
    it('should don`t throw error if not set options', function(){
      (function(){ analyzeCss();}).should.not.throw();
    });
    it('should error on stream', function (done) {

      var srcFile = new gutil.File({
        path: 'test/fixtures/propertyResets.css',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/propertyResets.css')
      });

      var stream = analyzeCss();

      stream.on('error', function(err) {
        should.exist(err);
        done();
      });

      stream.on('data', function (newFile) {
        newFile.contents.pipe(es.wait(function(err) {
          done(err);
        }));
      });

      stream.write(srcFile);
      stream.end();
    });
  });

  describe('Analize and transform: ', function () {
    it('should analize and return Object result via buffer', function (done) {

      var expectedFile = new gutil.File({
          path: 'test/expected/propertyResets.json',
          cwd: 'test/',
          base: 'test/expected',
          contents: fs.readFileSync('test/expected/propertyResets.json')
        }),
        srcFile = new gutil.File({
          path: 'test/fixtures/propertyResets.css',
          cwd: 'test/',
          base: 'test/fixtures',
          contents: fs.readFileSync('test/fixtures/propertyResets.css')
        }),
        stream = analyzeCss();

      stream.on('error', should.ifError);
      stream.on('error', done);

      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(String(expectedFile.contents));
        done();
      });

      stream.write(srcFile);
      stream.end();
    });
  });

  describe('Export result analyzing:', function () {
    var expectedFilepath = 'test/expected/super.json',
      outputFileDirectory = './temp',
      outputFilePath = './temp/super.json',
      srcFile = new gutil.File({
        path: 'test/fixtures/super.css',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/super.css')
      });

    beforeEach(function(done) {
      fs.mkdir(outputFileDirectory, done);
    });

    afterEach(function(done) {
      fs.exists(outputFilePath, function(exist) {
        exist && fs.unlinkSync(outputFilePath);
        fs.rmdirSync(outputFileDirectory);
        done();
      });
    });

    it('should create file when set `outDiretory` property', function (done) {
      var stream = analyzeCss({
        outDiretory: outputFileDirectory
      });

      stream.on('error', should.ifError);
      stream.on('error', done);

      stream.on('data', function () {
        fs.exists(outputFilePath, function(exist) {
          should.ok(exist);
          done();
        });
      });
      stream.write(srcFile);
      stream.end();
    });

    it('should filter `result.offenders` when create file with JSON result', function (done) {
      var expectedFile = new gutil.File({
          path: expectedFilepath,
          cwd: 'test/',
          base: 'test/expected',
          contents: fs.readFileSync(expectedFilepath)
        }),
        stream = analyzeCss({
          outDiretory: outputFileDirectory
        });

      stream.on('error', should.ifError);
      stream.on('error', done);

      stream.on('data', function () {
        fs.readFile(outputFilePath, function(err, data) {
          if (err){
            should.ifError(err);
            done(err);
          }
          String(expectedFile.contents).should.equal(String(data));
          done();
        });
      });
      stream.write(srcFile);
      stream.end();
    });
  });

});
