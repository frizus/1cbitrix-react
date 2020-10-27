import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlaceholderLine from "./PlaceholderLine.js";

export default class Header2 extends Component {
	renderMenuLinks(menu) {
		let links = menu.map((link, id) => {
			return (
				<Link key={id} to={link.href} className="list-group-item border-0 font-weight-bold py-3">
					{link.text}
				</Link>
			)
		});

		return (
			<ul className="list-group list-group-horizontal">
				{links}
			</ul>
		)
	}

	render() {
		let topMenu2 = '';

		if (!$.isEmptyObject(this.props.site)) {
			topMenu2 = this.renderMenuLinks(this.props.site.topMenu2);
		}

		return (
			<div className="container-fluid header3">
				<div className="container">
					<div className="row">
						<div className="col-3 header3-col1 bg-primary d-flex align-items-center">
							<div className="px-3 text-white">
								<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" className="bi bi-justify pr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
								</svg>
								<div className="text-uppercase font-weight-bold align-middle d-inline-block">Категории</div>
							</div>
						</div>
						<div className="col-9 header3-col2 d-flex justify-content-end align-items-center">
							{$.isEmptyObject(this.props.site)
								? (
									<React.Fragment>
										<PlaceholderLine className="placeholder-line"/>
										<PlaceholderLine className="placeholder-line"/>
										<PlaceholderLine className="placeholder-line"/>
									</React.Fragment>
								) : topMenu2
							}

						</div>
					</div>
				</div>
			</div>
		)
	}
}