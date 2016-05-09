/**
 * Register a task from Grunt or Shipit instance.
 */

module.exports = function registerTask(gruntOrShipit, name, task) {
  var shipitMethod = 'blTask';

  // Grunt
  if (gruntOrShipit.registerTask) {
    if (Array.isArray(task)) {
      return gruntOrShipit.registerTask(name, task);
    }

    return gruntOrShipit.registerTask(name, function() {
      var done = this.async();
      var promise = task();

      if (promise && promise.nodeify) {
        promise.nodeify(done);
      } else {
        done();
      }
    });
  }

  return gruntOrShipit[shipitMethod](name, task);
};
