/** @jsx React.DOM */
var React = require("react");
var Hello = require("./hello");

var Skeleton = React.createClass({
    render: function() {
        return (
            <div>
            <h1>Demo app, aight</h1>
            {this.renderHellos()}
            </div>
        );
    },
    renderHellos: function() {
        return $.map(
            this.props.names,
            function (n) {
                return <Hello key={n} name={n} />;
        });
    }
});


module.exports = Skeleton;
