import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlaceholderLine from "./PlaceholderLine.js";

export default class Header1 extends Component {
	renderHelp(help) {
		return help.length > 0 && <span className="text-muted small">&nbsp;{help}</span>
	}

	renderFirstEntity(entity, icon) {
		return (
			<a className="btn btn-sm btn-link btn-noshadow" href={entity.href}>
				{icon}
				{entity.text}
				{this.renderHelp(entity.help)}
			</a>
		);
	}

	renderPhoneIcon() {
		return (
			<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-phone d-inline-block mb-1 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
				<path fillRule="evenodd" d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
			</svg>
		)
	}

	renderEmailIcon() {
		return (
			<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-envelope d-inline-block mb-1 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
			</svg>
		)
	}

	renderAdditionalEntities(entities) {
		return entities.map((entity, id) => {
			return (
				<a key={id} className="dropdown-item" href={entity.href}>
					{entity.text}
					{this.renderHelp(entity.help)}
				</a>
			)
		})
	}

	renderEntityGroup(firstEntity, entities, icon) {
		return (
			<div className="btn-group dropdown">
				{this.renderFirstEntity(firstEntity, icon)}
				<button className="btn btn-sm btn-noshadow pr-0 pl-0 dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>
				<div className="dropdown-menu">
					{this.renderAdditionalEntities(entities)}
				</div>
			</div>
		)
	}

	renderUserRegister() {
		return (
			<a href="#" className="btn btn-link btn-sm btn-noshadow">
				<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-person d-inline-block mb-1 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
				</svg>
				Зарегистрироваться
			</a>
		)
	}

	renderUserAuthorize() {
		return (
			<a href="#" className="btn btn-link btn-sm btn-noshadow">
				<div style={{width: "0", height: "1.5em"}} className="d-inline-block align-middle"></div>
				Войти
			</a>
		)
	}

	renderUserAuthorized(userLogin, userMenu) {
		return (
			<div className="dropdown">
				<a className="btn btn-sm btn-link btn-noshadow dropdown-toggle" data-toggle="dropdown" href="#">
					{userLogin}
				</a>
				<div className="dropdown-menu dropdown-menu-right">
					{userMenu.map((item, id) => {
						return (
							<Link key={id} className="dropdown-item" to={item.href}>
								{item.text}
							</Link>
						)
					})}
				</div>
			</div>
		)
	}

	render() {
		let phone = '';

		if (!$.isEmptyObject(this.props.site)) {
			if (this.props.site.phone.length > 0) {
				let phones = $.extend([], this.props.site.phone);
				let firstPhone = phones.shift();
				if (this.props.site.phone.length == 1) {
					phone = this.renderFirstEntity(firstPhone, this.renderPhoneIcon())
				} else {
					phone = this.renderEntityGroup(firstPhone, phones, this.renderPhoneIcon())
				}
			}
		}

		let email = '';

		if (!$.isEmptyObject(this.props.site)) {
			if (this.props.site.email.length > 0) {
				let emails = $.extend([], this.props.site.email);
				let firstEmail = emails.shift();
				if (this.props.site.email.length == 1) {
					email = this.renderFirstEntity(firstEmail, this.renderEmailIcon())
				} else {
					email = this.renderEntityGroup(firstEmail, emails, this.renderEmailIcon())
				}
			}
		}

		let user1 = '';

		if (!$.isEmptyObject(this.props.site)) {
			if (this.props.site.userIsAuthorized) {
				user1 = null;
			} else {
				user1 = this.renderUserRegister();
			}
		}

		let user2 = '';

		if (!$.isEmptyObject(this.props.site)) {
			if (this.props.site.userIsAuthorized) {
				user2 = this.renderUserAuthorized(this.props.site.userLogin, this.props.site.userMenu);
			} else {
				user2 = this.renderUserAuthorize();
			}
		}

		return (
			<nav className="navbar navbar-light bg-light d-none d-sm-flex">
				<div className="container">
					<span className="navbar-text pb-0 pt-0">
						{$.isEmptyObject(this.props.site)
							? <PlaceholderLine className="placeholder-line placeholder-header1-line1"/>
							: phone
						}
							{$.isEmptyObject(this.props.site)
								? <PlaceholderLine className="placeholder-line placeholder-header1-line2"/>
								: email
							}
					</span>
					<span className="navbar-text pb-0 pt-0">
						{$.isEmptyObject(this.props.site)
							? <PlaceholderLine className="placeholder-line placeholder-header1-line3"/>
							: user1
						}
							{$.isEmptyObject(this.props.site)
								? <PlaceholderLine className="placeholder-line placeholder-header1-line4"/>
								: user2
							}
					</span>
				</div>
			</nav>
		);
	}
}