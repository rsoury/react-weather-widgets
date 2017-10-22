import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class App extends Component{
	render(){
		return (
			this.props.children
		);
	}
}

function mapStateToProps(state, ownProps){
  return {};
}
function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);