var sinon = require('sinon');
require('sinon-as-promised');
var expect = require('chai').use(require('sinon-chai')).expect;
var Shipit = require('shipit-cli');
var utils = require('../../index');
// var Promise = require('bluebird');
var path = require('path');
var grunt = require('grunt');

describe('utils', function() {
  var shipit, task;
  beforeEach(function() {
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

  describe('#getShipit', function() {
    it('should return Shipit', function(done) {
      expect(utils.getShipit(shipit)).to.equal(shipit);
      expect(utils.getShipit(grunt)).to.equal(shipit);
      done();
    });
  });

  describe('#registerTask', function() {
    it('should register a Grunt task', function(done) {
      utils.registerTask(grunt, 'test', task);
      expect(grunt.task.exists('test')).to.equal(true);
      done();
    });

    it('should register a Shipit task', function(done) {
      utils.registerTask(shipit, 'test', task);
      expect(shipit.hasTask('test')).to.equal(true);
      done();
    });

    it('should optionally register a Grunt task with desc.', function(done) {
      utils.registerTask(grunt, 'test', 'something testy!', task);
      expect(grunt.task.exists('test')).to.equal(true);
      done();
    });

    it('should still register a Shipit task if there is a desc.', function(done) {
      utils.registerTask(shipit, 'test', 'something testy!', task);
      expect(shipit.hasTask('test')).to.equal(true);
      done();
    });
  });

  describe('#equalValues', function() {
    it('should return false', function(done) {
      expect(utils.equalValues([
        {stdout: '/remote/deploy/releases/20141704123138'},
        {stdout: '/remote/deploy/releases/20141704123137'}
      ])).to.equal(false);
      done();
    });
  });

  describe('#runTask', function() {
    it('should return Grunt', function(done) {
      expect(utils.runTask(grunt, 'test')).to.have.property('registerTask');
      done();
    });
  });

});
