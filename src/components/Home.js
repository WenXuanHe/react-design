
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link  } from 'react-router-dom';
import TodosActions from '../actions';

class Home extends React.Component {

    constructor(){
        super(...arguments);
    }

    componentDidMount(){
        this.props.dispatch({
            type:"queryCount"
        });
    }

    render() {
        let { text, count } = this.props;

        return (
            <div className="">
                <div>{text}</div>
                <div className="">
                    <div className="count">{count}</div>
                    <div><Link to="/hello">hello </Link></div>
                </div>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        text: state.home.text,
        count: state.home.count
    }
})(Home);
