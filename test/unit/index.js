var sinon = require('sinon');
require('sinon-as-promised');
var expect = require('chai').use(require('sinon-chai')).expect;
var Shipit = require('shipit-cli');
var utils = require('../../index');
// var Promise = require('bluebird');
var path = require('path');
var grunt = require('grunt');

describe('utils', function () {
  var shipit, task;
  beforeEach(function () {
    shipit = new Shipit({
      environment: 'test',
      log: sinon.stub()
    });

    // Shipit config
    shipit.initConfig({
      test: {
        workspace: '/tmp/workspace',
        deployTo: '/remote/deploy'
      }
    });

    grunt.shipit = shipit;
    task = function() {
      return shipit.local('sleep 2s && echo test');
    };
  });

  describe('#getShipit', function () {
    it('should return Shipit from Shipit', function (done) {
      expect(utils.getShipit(shipit)).to.equal(shipit);
      done();
    });

    it('should return Shipit from Grunt', function (done) {
      expect(utils.getShipit(grunt)).to.equal(shipit);
      done();
    });
  });

  describe('#registerTask', function () {
    it('should register a Grunt task', function (done) {
      utils.registerTask(grunt, 'test', task);
      expect(grunt.task.exists('test')).to.equal(true);
      done();
    });
  });

});
