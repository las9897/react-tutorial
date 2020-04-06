import React, { Component } from 'react';

/* function MyName(props) {


	return (
		<div>
			My Name is <b>{props.name}</b>
		</div>
	);
} */

// 함수형 컴포넌트 + 익명 함수

const MyName = ({name}) =>{
	return(
		<div>
			Hello MyName is {name}!
		</div>
	);
};

class SecondName extends Component{
	static defaultProps = {
		name: "기본 이름"
	};
	render(){
		return(
			<div>
				My Secound Name is <b>{this.props.name}</b>
			</div>
		);
	}
}

export {MyName, SecondName};