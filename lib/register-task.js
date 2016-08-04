/**
 * Register a task from Grunt or Shipit instance.
 * If optional description argument is used, and taskrunner is grunt
 * pass along the description for the task.
 */

module.exports = function registerTask(gruntOrShipit, name, desc, task) {
  var shipitMethod = 'blTask';

  // Grunt
  if (gruntOrShipit.registerTask) {
    if (typeof desc !== 'string') {
      if (Array.isArray(desc)) {
        return gruntOrShipit.registerTask(name, desc);
      }

      return gruntOrShipit.registerTask(name, function() {
        var done = this.async();
        var promise = desc();

        if (promise && promise.nodeify) {
          promise.nodeify(done);
        } else {
          done();
        }
      });
    } else {
      if (Array.isArray(task)) {
        return gruntOrShipit.registerTask(name, desc, task);
      }

      return gruntOrShipit.registerTask(name, desc, function() {
        var done = this.async();
        var promise = task();

        if (promise && promise.nodeify) {
          promise.nodeify(done);
        } else {
          done();
        }
      });
    }
  }

  // Manage calls not using description
  if (typeof desc !== 'string') {
    return gruntOrShipit[shipitMethod](name, desc);
  } else {
    return gruntOrShipit[shipitMethod](name, task);
  }
};