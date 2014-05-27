/** @jsx React.DOM */
var React = require("react");

var Hello = React.createClass({
    render: function() {
        return (
            <div className="hello">
                Hello {this.props.name}!
            </div>
        );
    }
});

module.exports = Hello;
