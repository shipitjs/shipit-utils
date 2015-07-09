/**
 * Register a task from Grunt or Shipit instance.
 */

module.exports = function registerTask(gruntOrShipit, name, deps, fn) {
  var shipitMethod = 'blTask';
  var callbackTask;
  var timestamp = +new Date();

  // Normalize optional args
  if (!fn && typeof deps === 'function') {
    fn = deps;
    deps = undefined;
  }

  deps = deps || [];
  fn = fn || function () {};

  // If Grunt...
  if (gruntOrShipit.registerTask) {
    callbackTask = gruntOrShipit.registerTask(name + timestamp, fn);
    deps = deps.push(callbackTask);

    return gruntOrShipit.registerTask(name, deps);
  }

  return gruntOrShipit[shipitMethod](name, deps, fn);
};
