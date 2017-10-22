import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Widget from './Widget';
import * as widgetActions from '../../actions/widgetActions';
import objectEmpty from '../../utils/objectEmpty';

class HomePage extends Component{
	componentDidMount(){
		this.props.widgets.forEach(({ lat, lng, weather }, key) => {
			if(objectEmpty(weather)){
				this.props.actions.loadWidgetWeather(key, { lat, lng });
			}
		});	
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
	}

	closeWidget = id => {
		this.props.actions.removeWidget(id);
	}

	render(){
		return (
			<main>
				<Header />
				<div className="widget-area">
					{
						this.props.widgets.map((widget, key) => {
							return <Widget key={key} id={key} {...widget} onClose={this.closeWidget} />
						})
					}
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, ownProps){
	return {
		widgets: state.widgets
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(widgetActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);