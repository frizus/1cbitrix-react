import React, { Component } from "react"
import ContentLoader from "react-content-loader"

export default class PlaceholderLine extends Component {
	render() {
		return (
			<ContentLoader
				speed={2}
				width={139}
				height={15}
				viewBox="0 0 139 15"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className={this.props.className}
				title="Загрузка..."
			>
				<rect x="0" y="0" rx="5" ry="5" width="139" height="15" />
			</ContentLoader>
		)
	}
}