
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link  } from 'react-router-dom';
import mockData from '../../mock';
import TodosActions from '../actions';

class Hello extends React.Component {

    constructor(){
        super(...arguments);
        let { getAuthors } = this.props;
        getAuthors();
    }
    
    render() {
        let { text, authors} = this.props;
        
        return (
            <div className="">
                <div>{text} {JSON.stringify(authors)}</div>
                <p><span>{authors.firstName} {authors.lastName}</span></p>
                <div className="">
                    <div><Link to="index">home</Link></div>
                </div>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        text: state.hello.text || state.hello.get('text'),
        authors: state.hello.authors || state.hello.get('authors')
    }
})(Hello)