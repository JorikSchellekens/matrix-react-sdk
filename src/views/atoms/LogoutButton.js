var React = require('react');

var LogoutButtonController = require("../../controllers/atoms/LogoutButton");

module.exports = React.createClass({
    displayName: 'LogoutButton',
    mixins: [LogoutButtonController],

    render: function() {
        return (
            <button className="mx_LogoutButton" onClick={this.onClick}>Sign out</button>
        );
    }
});
