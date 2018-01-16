
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Hello extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'hello/queryCount'
        }).then(function() {
            console.log('arguments:', arguments);
        });
    }

    render() {
        let { text } = this.props;

        return (
            <div className="">
                <div>{text} </div>
                <div className="">
                    <div><Link to="index">home</Link></div>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    console.log('state', state);
    return {
        text: state.hello.text,
    };
})(Hello);