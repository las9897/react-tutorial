import React, { Component } from 'react'

class Counter extends Component {

	/* 
		// 익명함수가 아닌 방법을 사용시 bind 처리를 해줘야 한다.
		constructor(props){
			super(props);
			this.handleIncrease = this.handleIncrease.bind(this);
			this.handleDecrease = this.handleDecrease.bind(this);
		} */


	// class field를 사용하는 방법과 생성자를 사용하는 방법이 있는데
	// 만약에 둘을 같이 쓴다고하면 class field -> constructor 순으로 실행된다.
	// 즉 아래와 같은 코드를 같이 작성하면 number 값은 1으로 변한다
	/* 
		constructor(props){
			super(props);
			state = {
				number: 1
			}
		}
	 */
	state = {
		number: 0
	};


	handleIncrease = () => {
		// state의 값을 바꾸기 위해서는 this.setState를 무조건 거쳐야한다.
		// 리액트에서는 setState를 호출되면 컴포넌드가 리렌더링이 되도록 설계되어있다.

		/* this.setState({
			number: this.state.number + 1
		}); */
		this.setState(
			/* (state) => ({
				number: state.number
			}) */

			// 비구조화 할당 문법
			({ number }) => ({
				number: number + 1
			})
		)
	};

	handleDecrease = () => {
		/* this.setState({
			number: this.state.number - 1
		}) */
		this.setState(
			({ number }) => ({
				number: number - 1
			})
		)
	}

	render() {
		return (
			<div>
				<h1>카운터</h1>
				<div>값: {this.state.number}</div>
				{/* 
					이벤트 함수를 설정할 때 camelCase로 설정해줘야 한다.
					onclick -> onClick
					이벤트에 전달해주는 값은 함수여야 한다.
					잘못됌: onClick={this.handleIncrease()} => 렌더링 -> 함수 호출 -> setState -> 렌더링..무한반복
					올바름: onClick={this.handleIncrease}
				 */}
				<button onClick={this.handleIncrease}>+</button>
				<button onClick={this.handleDecrease}>-</button>
			</div>
		);
	}
}


export default Counter;