import React, { Component } from 'react';

class PhoneInfo extends Component {
	static defaultProps = {
		info: {
			name: '이름',
			phone: '010-0000-0000',
			id: 0
		}
	}

	state = {
		editing: false,
		name: '',
		phone: '',
	}

	handleRemove = () => {
		//삭제 버튼이 클릭되면 onRemove에 id를 넣어서 호출
		const { info, onRemove } = this.props;
		onRemove(info.id);
	}

	handleToggleEdit = () => {
		const { editing } = this.state;
		this.setState(
			{ editing: !editing }
		)
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	componentDidUpdate(prevProps, prevState) {
		// editing 값이 바뀔 때 처리할 로직이 적혀있다.
		// 수정을 눌렀을 때는 기존의 값이 input에 나타나고
		// 수정을 적용할 땐 input의 값들을 부모한테 전달해준다.
		const { info, onUpdate } = this.props;
		if (!prevState.editing && this.state.editing) {
			// editing false -> true :  {state} = 
			this.setState({
				name: info.name,
				phone: info.phone
			})
		}
		if(prevState.editing && !this.state.editing){
			onUpdate(info.id, {
				name: this.state.name,
				phone: this.state.phone
			})
		}
	}


	render() {
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px'
		}

		const { editing } = this.state;

		if (editing) {
			return (
				<div style={style}>
					<div>
						<input
							value={this.state.name}
							name="name"
							placeholder="이름"
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							value={this.state.phone}
							name="phone"
							placeholder="전화번호"
							onChange={this.handleChange}
						/>
					</div>
					<button onClick={this.handleToggleEdit}>적용</button>
					<button onClick={this.handleRemove}>삭제</button>
				</div>
			);
		}

		const { name, phone } = this.props.info;
		return (
			<div style={style}>
				<div><b>{name}</b></div>
				<div>{phone}</div>
				<button onClick={this.handleToggleEdit}>수정</button>
				<button onClick={this.handleRemove}>삭제</button>
			</div>
		);
	}
}

export default PhoneInfo;

