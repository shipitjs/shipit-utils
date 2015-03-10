/**
 * Register a task from Grunt or Shipit instance.
 */

module.exports = function registerTask(gruntOrShipit, name, task, async) {
  async = (async === undefined) ? false : async;
  var shipitMethod = async ? 'task' : 'blTask';

  // Grunt
  if (gruntOrShipit.registerTask) {
    if (Array.isArray(task) || !async) {
      return gruntOrShipit.registerTask(name, task);
    }

    return gruntOrShipit.registerTask(name, function () {
      var done = this.async();
      var promise = task();

      if (promise) {
        promise.nodeify(done);
      } else {
        done();
      }
    });
  }

  return gruntOrShipit[shipitMethod](name, task);
};
