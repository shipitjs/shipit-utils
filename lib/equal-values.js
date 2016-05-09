var _ = require('lodash');

/**
 * Test if all values are equal.
 *
 * @param {*[]} values
 * @returns {boolean}
 */

module.exports = function equalValues(values) {
  return values.every(function(value) {
    return _.isEqual(value, values[0]);
  });
};
