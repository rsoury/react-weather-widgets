import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class HomePage extends Component{
	render(){
		return (
			<div>
				Hello World!
			</div>
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