import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { MyName, SecondName } from './MyName';
import Counter from './Counter';
import LifeCycle from './LifeCycle';


function App() {
  return (
    <div>
      <MyName name="리액트" test="테스트" />
      <SecondName name="바보드랑" />
      {/* <Counter /> */}
      <LifeCycle />
    </div>
  );
}

export default App;
