import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header2Logo from "./Header2Logo";

export default class Header2 extends Component {
	render() {
		let logo = '';

		if (!$.isEmptyObject(this.props.site)) {
			logo = (
				<Link to="/">
					<img src={this.props.site.logo} className="img-fluid" alt={this.props.site.title} title={this.props.site.title}/>
				</Link>
			)
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-2 col-sm-3 col-3 order-1">
						<div className="logo">
							{$.isEmptyObject(this.props.site)
								? <Header2Logo className="Header2Logo"/>
								: logo
							}
						</div>
					</div>
					<div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
						<div className="search-wrapper">
							<div className="input-group input-group-lg search">
								<input type="text" className="form-control" placeholder="Товары..."/>
								<div className="input-group-append">
									<button className="btn btn-outline-secondary rounded-0 dropdown-toggle" data-toggle="dropdown">Все категории</button>
									<div className="dropdown-menu">
										<a className="dropdown-item" href="#">Action</a>
										<a className="dropdown-item" href="#">Another action</a>
										<a className="dropdown-item" href="#">Something else here</a>
										<div role="separator" className="dropdown-divider"></div>
										<a className="dropdown-item" href="#">Separated link</a>
									</div>
									<button className="btn btn-primary has-ripple" type="button">
										<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
											<path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
						<div className="media-wrapper">
							<div className="media d-inline-flex">
								<svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-heart d-flex align-self-center mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
								</svg>
								<div className="media-body">
									<Link to="/favorites/" className="font-weight-bold">Избранное</Link><br/>
									<span className="text-muted" id="favs-count">0</span>
								</div>
							</div>

							<div className="media d-inline-flex ml-3">
								<svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-handbag d-flex align-self-center mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M8 1a2 2 0 0 0-2 2v2h4V3a2 2 0 0 0-2-2zm3 4V3a3 3 0 1 0-6 0v2H3.361a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.356a2.5 2.5 0 0 0 2.472-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 0 0 1 0V6h4z"/>
								</svg>
								<div className="media-body">
									<Link to="/cart/" className="font-weight-bold">Корзина</Link><br/>
									<span className="text-muted" id="cart-count">0</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}