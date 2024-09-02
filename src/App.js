import React, { Component } from 'react';
import './App.css';
import USAMap from "react-usa-map";
import axios from 'axios';
import * as XLSX from 'xlsx';
import ReactHTMLParser from 'react-html-parser';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentStateData: 'Select a state', laborJSONData: []}
  }

  componentDidMount() {
    this.handleFetchFromUrl();
  }

  handleFetchFromUrl = async () => {
    this.setState({currentStateData: 'Loading labor data, please wait at least one minute.'});
    const url = '/state_M2023_dl.xlsx';
    
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 32 });
      this.setState({laborJSONData: jsonData});
      this.setState({currentStateData: 'Select a state.'});
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
      this.setState({currentStateData: 'error'});
    }
  };

  mapHandler = (event) => {
    let stateName = event.target.querySelector('title').innerHTML;
    let currentStateData = this.state.laborJSONData.filter(i => i.AREA_TITLE === stateName);
    let newStateData = '<tr><th>' + stateName + '</th></tr><tr><th>Code</th><th>Occupation</th><th>Total Employed</th><th>Mean</th></tr>';
    for (let i=0; i<currentStateData.length; i++) {
      newStateData += '<tr><td>' + currentStateData[i]['OCC_CODE'] + '</td><td>' + currentStateData[i]['OCC_TITLE'] + '</td><td>' + currentStateData[i]['TOT_EMP'] + '</td><td>' + currentStateData[i]['A_MEAN'] + '</td></tr>'
    }
    this.setState({currentStateData: newStateData});
  };

  stateHandler = (stateName) => {
    let currentStateData = this.state.laborJSONData.filter(i => i.AREA_TITLE === stateName);
    let newStateData = '<tr><th>' + stateName + '</th></tr><tr><th>Code</th><th>Occupation</th><th>Total Employed</th><th>Mean</th></tr>';
    for (let i=0; i<currentStateData.length; i++) {
      newStateData += '<tr><td>' + currentStateData[i]['OCC_CODE'] + '</td><td>' + currentStateData[i]['OCC_TITLE'] + '</td><td>' + currentStateData[i]['TOT_EMP'] + '</td><td>' + currentStateData[i]['A_MEAN'] + '</td></tr>'
    }
    this.setState({currentStateData: newStateData});
  };

  onHover = (event) => {
    console.log('hovered');
  };

  statesFill = () => {
    return {
      "CA": {
        fill: "rgba(255,193,7,1.0)",
        clickHandler: () => {
          this.stateHandler('California');
          alert("Custom callback for this US state.");
        }
      }
    };
  };

  render() {
    return (
      <div className="App">
        <h1 className="header">Mike's US Labor Data By State</h1>
        <h3 className="subheader">Accessible to color blind people.  Easily extensible to similar dataset files that could be loaded by the user.</h3>
        <USAMap defaultFill={"rgba(250,255,250,0.8)"} customize={this.statesFill()} onClick={this.mapHandler} onMouseOver={this.onHover} />
        <table className="center state-data">{ReactHTMLParser(this.state.currentStateData)}</table>
      </div>
    );
  }
}

export default App;
