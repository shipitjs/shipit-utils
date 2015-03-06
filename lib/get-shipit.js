/**
 * Get shipit object from Grunt or Shipit instance.
 */

module.exports = function getShipit(gruntOrShipit) {
  if (gruntOrShipit.shipit) {
    return gruntOrShipit.shipit;
  }

  return gruntOrShipit;
};
