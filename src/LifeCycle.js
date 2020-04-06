import React, { Component } from "react";

const Problematic = () => {
	throw new Error("throw Error");
	return <div></div>;
};

class LifeCycle extends Component {
	static defaultProps = {
		onIncrement: () => console.warn("onIncrement is not defind"),
		object: {},
		array: [],
	};
	state = {
		number: 0,
		error: false,
	};
	constructor(props) {
		super(props);
		console.log("constructor");
	}

	componentWillMount() {
		// 이 API는 shouldComponentUpdate에서 true를 반환했을 때만 호출된다.
		// 주로 애니메이션 효과를 초기화하거느 이벤트 리스너를 없애는 작업을 한다.
		// 이 API가 호출된 후에는 render()가 호출된다.
		// v16.3 이후에 deprecated 되고 getSnapshotBeforeUpdate로 대체된다
		console.log("componentWillMount (deprecated)");
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// DOM 업데이트가 일어나기 직전의 시점
		// 새 데이터가 상단에 추가되어도 스크롤바 유지
		// scrollHeight는 전 후를 비교해서 스크롤 위치를 설정하기 위함
		// scrollTop은 이 기능이 크롬에 이미 구현이 되어있는데, 이미 구현이 되어있다면 처리하지 않도록 하기 위함.

		if (prevState.array !== this.state.array) {
			const { scrollTop, scrollHeight } = this.list;

			return {
				scrollTop,
				scrollHeight,
			};
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// 이 API는 render()를 호출하고 난 후 발생하게 된다.
		// 이 시점에서는 this.props와 this.state가 바뀌어있다.
		// 파라미터를 통해서 이전 값인 prevProps와 prevState를 조회할 수 있다.
		// getSnapshotBeforeUpdate에서 반환한 snapshot은 세번째 파라미터로 받아온다.
		console.log("componentDidUpdate");
		if (snapshot) {
			const { scrollTop } = this.list;
			if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않는다.
			const diff = this.list.scrollHeight - snapshot.scrollHeight;
			this.list.scrollTop += diff;
		}
	}

	componentDidMount() {
		// 외부 라이브러리 연동: D3, masonry
		// 컴포넌트에서 필요한 데이터 요청: ajax, graphQL
		// DOM에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
		console.log("componentDidMount");
	}

	shouldComponentUpdate(nextProps, nextState) {
		//5의 배수라면 리렌더링 하지 않음
		console.log("shouldComponentUpdate");
		if (nextState.number % 5 === 0) return false;
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log("componentWillUpdate");
	}

	componentDidCatch(error, info) {
		this.setState({
			error: true,
		});
	}

	componentWillReceiveProps(nextProps) {
		// 이 컴포넌트는 새로운 props를 받게되었을 때 호출
		// 이 안에서는 주로 state가 props에 따라 변해야하는 로직이 작성된다.
		// 새로 받게 될 props는 nextProps를 통해서 조회할 수 있으며
		// 이떄 this.props를 조회하면 업데이트 되기 전의 API이므로 참고해야한다.
		// this.props는 아직 바뀌지 않은 상태
		console.log("componentWillReceiveProps (deprecated)");
	}

	static getDerivedStateFormProps(nextProps, prevState) {
		// 여기서는 setState를 하는 것이 아닌 특정 props가 바뀔 때 설정하고,
		// 설정하고 싶은 state 값을 리턴하는 형태로 사용된다.
		/* 
			if(nextProps.value !== prevState.value){
				return {
					value: nextProps.value
				};
			}
			return null; // null을 리턴하면 따로 업데이트 할 것은 없다는 의미.
			 */
	}

	shouldComponentUpdate(nextProps, nextState) {
		// return false 하면 업데이트 안함
		// return this.props.checked !== nextProps.checked;
		// 이 API는 컴포넌트를 최적화하는 작업에서 매우 유용하게 사용됩니다.
		// 리액트는 변화가 발생하는 부분만 업데이트를 해줘서 성능이 잘나온다.
		// 하지만 변화를 감지하기 위해선 VDOM에 한번 그려줘야한다.
		// 현재 컴포넌트의 상태가 업데이트되지 않아도, 부모 컴포넌트가 리렌더링 되면서 자식 컴포넌트들도 렌더링이 된다.
		// 렌더링이 된다 = render()가 호출
		// 변화가 없으면 DOM 조작은 하지 않는다. VDOM에 렌더링할 뿐
		// 위 작업은 그렇게 부하가 많은 작업이 아니지만, 컴포넌트가 무수히 많이 렌더링 된다면 말이 달라진다.
		// 렌더링에는 CPU가 어느정도 사용되기 때문이다.
		// 쓸데없이 낭비되는 CPU 처리량을 줄여주기 위해서 VDOM에 리렌더링하는 것 마저 불필요한 경우에 이 API를 사용한다.
		// 기본적으로 true를 반환하지만, false일 경우 render()를 호출하지 않는다.
		return true;
	}

	componentWillUnmount() {
		// 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
		// ex) setTimeout을 걸은것이 있다면 clearTimeout을 통해 제거
	}

	handleIncrease = () => {
		const { number } = this.state;
		this.setState({
			number: number + 1,
		});
	};

	handleDecrease = () => {
		this.setState(({ number }) => ({
			number: number - 1,
		}));
	};

	render() {
		// 렌더링 부분에서 오류가 발생하는 것은 사전에 방지해주어야한다. 자주 발생하는 이유는 다음과 같다.
		// 존재하지 않는 함수를 호출하려고 할 때 ex)this.props.onCLick
		// 해당 객체나 배열이 존재하지 않을 때 this.props.object.value; (object is undefined)

		if (
			!this.props.object ||
			!this.props.array ||
			this.props.array.length === 0
		)
			return null; // 혹은 defaultProps를 통해서 설정하면 된다. 상단의 defaultProps 참고
		console.log("render");
		if (this.state.error) return <h1>ErrorErrorError</h1>;

		return (
			<div>
				<h1>LifeCycle</h1>
				<div>Value : {this.state.number}</div>
				{this.state.number === 4 && <Problematic />}
				<button onClick={this.handleIncrease}>+</button>
				<button onClick={this.handleDecrease}>-</button>
			</div>
		);
	}
}

export default LifeCycle;
