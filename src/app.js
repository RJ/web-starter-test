/** @jsx React.DOM */

global.$ = require('jQuery');

var React = require("react");
var Skeleton = require("./skeleton");

var Backbone = require("backbone");

var names = ["Alice", "Bob", "Charlie"];

console.log(Backbone);

React.renderComponent(
    <Skeleton names={names} />,
    $('#react').get(0)
);

