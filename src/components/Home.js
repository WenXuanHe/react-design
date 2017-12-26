
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link  } from 'react-router-dom';
import TodosActions from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        text: state.home.text || state.home.get('text')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

class Home extends React.Component {

    constructor(){
        super(...arguments);
    }

    render() {
        let { text } = this.props;

        return (
            <div className="">
                <div>{text}</div>
                <div className="">
                    <div><Link to="/hello">hello </Link></div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
