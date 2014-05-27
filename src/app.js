/** @jsx React.DOM */

global.$ = require('jQuery');

var React = require("react");
var Skeleton = require("./skeleton");

var names = ["Alice", "Bob", "Charlie"];

console.log($);

React.renderComponent(
    <Skeleton names={names} />,
    $('#react').get(0)
);

