import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from './Header';

class HomePage extends Component{
	
	componentWillReceiveProps(nextProps){
		
	}

	render(){
		return (
			<main>
				<Header />
			</main>
		);
	}
}

function mapStateToProps(state, ownProps){
  return {};
}
function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);