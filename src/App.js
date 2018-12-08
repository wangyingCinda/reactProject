import React, { Component } from 'react';
import Headbar from './components/headbar';
import Sidebar from './components/sidebar';
import Nav from './components/nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Headbar></Headbar>
        <Nav></Nav>
        <Sidebar></Sidebar>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default App;
