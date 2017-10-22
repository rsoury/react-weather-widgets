import React, { Component } from 'react';
import countries from '../../constants/countries';

class Header extends Component{
	constructor(state, props){
		super(state, props);

		this.state = {
			selected: {
				name: 'Australia',
				code: 'AU'
			}
		};

	}

	onChange = event => {
		const selected = countries.filter(({ code }) => code === event.target.value)[0];
		if(selected.code !== this.state.selected.code){
			this.setState({ selected: { ...selected } });
		}
	};
	add = () => {

	};

	render(){
		return (
			<header>
				<div>
					<select onChange={this.onChange}>
						{
							countries.map(({ name, code }) => {
								return code === this.state.selected.code ? (
									<option value={code} selected>{name}</option>
								) : (
									<option value={code}>{name}</option>
								);
							})
						}
					</select>
				</div>
				<div>
					<button onClick={this.add}>
						{ `Show weather data for ${this.state.selected.name}` }
					</button>
				</div>
			</header>
		);
	}
}

export default Header;