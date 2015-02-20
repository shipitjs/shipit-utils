module.exports = function () {
  return {
    getShipit: require('lib/get-shipit'),
    registerTask: require('lib/register-task'),
    runTask: require('lib/run-task'),
  };
};
