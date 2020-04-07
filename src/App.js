import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { MyName, SecondName } from './MyName';
import Counter from './Counter';
import LifeCycle from './LifeCycle';
import PhoneForm from './PhoneForm';
import PhoneInfoList from './PhoneInfoList';


class App extends Component {

  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-1234-1234'
      },

    ]
  }


  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data }
          : info
      )
    })
  }

  render() {
    const { information } = this.state;
    return (
      <div>
        {/* <MyName name="리액트" test="테스트" /> */}
        {/* <SecondName name="바보드랑" /> */}
        {/* <Counter /> */}
        {/* <LifeCycle /> */}
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <PhoneInfoList
          data={information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }

}

export default App;
