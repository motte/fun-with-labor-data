import React, { Component } from 'react';
import './App.css';
import USAMap from "react-usa-map";

class App extends Component {
  mapHandler = (event) => {
    let stateName = event.target.querySelector('title').innerHTML;
  };

  statesFill = () => {
    return {
      "CA": {
        fill: "rgba(0,0,155,0.8)",
        clickHandler: () => alert("Custom callback for this US state.")
      },
      "NY": {
        fill: "rgba(0,0,50,0.8)"
      }
    };
  };

  render() {
    return (
      <div className="App">
        <h1 className="header">Mike's US Labor Data Visualization</h1>
        <USAMap defaultFill={"rgba(250,255,250,0.8)"} customize={this.statesFill()} onClick={this.mapHandler} onMouseOver={this.mapHandler} />
      </div>
    );
  }
}

export default App;
