import React, { Component } from 'react';

class DataModify extends Component {


	render() {
		const array = [
			{ id: 0, text: 'hello', tag: 'a' },
			{ id: 1, text: 'world', tag: 'b' },
			{ id: 2, text: 'bye', tag: 'c' }
		];
		const modifiedArray = array.map(
			item => item.id === 1
				? { ...item, text: 'Korea' }
				: item
		)
	}
}

export default DataModify;