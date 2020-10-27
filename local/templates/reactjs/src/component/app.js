import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Header1 from './Header1';
import Header2 from './Header2';
import Header3 from './Header3';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			site: {}
		}
	}

	componentDidMount() {
		$.ajax({
			url: '/api/site.php',
			contentType: 'application/json',
			method: 'GET'
		})
			.then(site => {
				window.setTimeout(() => {
					this.setState({ site })
				}, 5000);
			});
	}

	render() {
		return (
			<Router>
				<Header1 site={this.state.site}/>
				<Header2 site={this.state.site}/>
				<Header3 site={this.state.site}/>
			</Router>
		);
	}
}