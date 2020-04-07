import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo'

class PhoneInfoList extends Component {

	static defaultProps = {
		data: [],
		onRemove: () => console.warn('onRemove not defined'),
		onUpdate: () => console.warn('onUpdate not defined'),
	}

	render() {
		const { data, onRemove, onUpdate } = this.props;
		const list = data.map(
			/* key는 배열을 렌더링을 할 때 꼭 필요한 값.
			리액트는 배열을 렌더링할 때 값을 통하여 업데이트 성능을 최적화함 */
			info => (
				<PhoneInfo
					key={info.id}
					info={info}
					onRemove={onRemove}
					onUpdate={onUpdate}
				/>
			)
		);

		return (
			<div>
				{list}
			</div>
		);
	}
}

export default PhoneInfoList;