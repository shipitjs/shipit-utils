# shipit-utils

## Install

```
npm install --save shipit-utils
```

## Usage

```js
var utils = require('shipit-utils');
```

## Methods

### utils.getShipit(gruntOrShipit)

Returns the Shipit object, regardless of your context (Grunt or Shipit).

```js
var shipit = utils.getShipit(gruntOrShipit);
```

### utils.registerTask(gruntOrShipit, name, [description,] task)
Register a task, regardless of your context (Grunt or Shipit).

The description arguement is optional, and will only try to pass along a task description if you are using Grunt (it will be ignored if you are using Shipit).

##### task `Fn`|`Array<String>`
Task function or array of task names to run in order. *Note: If in a Grunt context and passing an array of task names, task will always be synchronous/blocking.*

#### Examples

```js
var task = function() {
    return shipit.local('sleep 10s');
};

// Register a (blocking) task
utils.registerTask(gruntOrShipit, 'myTask', task);

// Run a series of tasks in order
utils.registerTask(gruntOrShipit, 'myTask', ['some', 'other', 'tasks']);
```

### utils.runTask(gruntOrShipit, task)
Run a task or array of tasks, regardless of your context (Grunt or Shipit).

##### task `String`|`Array<String>`

### utils.equalValues(values)
Test to see if all the values in an array are equal. Useful for determining if multiple remote servers are out of sync.

##### values `Array`

## License

MIT
