(function(window){

  var Shared;

  Shared = (function() {
    var check, checkForMany, checkOrSet, data, loopThroughAndCallFunction, set;

    function Shared() {}

    data = {
      behavior: {},
      setup: {},
      scenario: {}
    };

    set = function(resource) {
      return function(description, fn) {
        data[resource][description] = fn;
        return this;
      };
    };

    checkForMany = function(resource) {
      return function(description, array) {
        var value, _i, _len, _results;
        if (array === null) {
          array = [];
        }
        _results = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          value = array[_i];
          _results.push(check(resource)(description, value));
        }
        return _results;
      };
    };

    check = function(resource) {
      return function(description, value) {
        return data[resource][description](value);
      };
    };

    checkOrSet = function(resource) {
      return function(description, fn) {
        var value;
        if (typeof fn === 'function') {
          set(resource)(description, fn);
        } else {
          value = fn;
          check(resource)(description, value);
        }
        return this;
      };
    };

    loopThroughAndCallFunction = function(values, fn) {
      var err, value, _i, _len;
      if (typeof fn === 'function') {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          fn(value);
        }
      }
      if (typeof fn === 'string') {
        try {
          checkForMany('scenario')(fn, values);
        } catch (_error) {
          err = _error;
          if (data.behavior[fn] !== void 0) {
            throw new Error("The sugar-syntax for 'forMany' requires a scenario. Got behavior: '" + fn + "'");
          } else if (data.setup[fn] !== void 0) {
            throw new Error("The sugar-syntax for 'forMany' requires a scenario. Got setup: '" + fn + "'");
          } else {
            throw err;
          }
        }
      }
      return this;
    };

    Shared.prototype.forMany = loopThroughAndCallFunction;

    Shared.prototype["for"] = loopThroughAndCallFunction;

    Shared.prototype.behavior = checkOrSet('behavior');

    Shared.prototype.hasBehavior = checkOrSet('behavior');

    Shared.prototype.behavesLike = checkOrSet('behavior');

    Shared.prototype.behaviour = checkOrSet('behavior');

    Shared.prototype.hasBehaviour = checkOrSet('behavior');

    Shared.prototype.setup = checkOrSet('setup');

    Shared.prototype.scenario = checkOrSet('scenario');

    return Shared;

  })();

  shared = new Shared();

})(document.window);
