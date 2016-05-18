import React from 'react';

/* eslint-disable no-param-reassign, no-underscore-dangle */

export default function bindClosures(closuresMap) {
  return (component) => {
    const componentName = component.displayName || component.name || 'Component';
    const closureNames = Object.keys(closuresMap);
    const spec = closureNames.reduce((memo, closureName) => {
      const injectedClosure = closuresMap[closureName];
      memo[closureName] = function boundClosure(...args) {
        return injectedClosure(this.props, ...args);
      };

      return memo;
    }, {});

    spec.componentWillMount = function componentWillMount() {
      this.__closures = closureNames.reduce((memo, closureName) => {
        memo[closureName] = this[closureName];
        return memo;
      }, {});
    };

    spec.render = function render() {
      return component(this.props, this.__closures);
    };

    const Wrapper = React.createClass(spec);
    Wrapper.displayName = `ClosureWrapper(${componentName})`;

    return Wrapper;
  };
}
