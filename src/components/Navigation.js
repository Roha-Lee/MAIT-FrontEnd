import React from 'react';

class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        console.log(this.state);
        return (
            <div id="navigation">
                <span>EMIT</span>
                <span>Sign up</span>
                <span>Sign in</span>
            </div>
        );
    }
}
export default Navigation;