import React, { Component } from "react"
import ContentLoader from "react-content-loader"

export default class Header2Logo extends Component {
	render() {
		return (
			<ContentLoader
				speed={2}
				width="100%"
				height={85}
				viewBox="0 0 150 85"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className={this.props.className}
				title="Загрузка..."
			>
				<rect x="0" y="0" rx="5" ry="5" width="150" height="85" />
			</ContentLoader>
		)
	}
}