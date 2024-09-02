import React, { Component } from 'react';
import './ToggleModeButton.css';


class ToggleModeButton extends Component {

  constructor(props) {
    super(props);
    this.state = {isDarkMode: 'true'}
  }

  componentDidMount() {
	const $button = document.getElementById('toggleModeButton');
	let newValue = true;
	newValue = window.matchMedia('prefers-color-scheme: dark') ? true : false;
	if (newValue) {
		document.body.className = 'dark';
	} else {
		document.body.className = '';
	}
	this.setState({isDarkMode: newValue});
  }  
	

  toggle = () => {
	const $button = document.getElementById('toggleModeButton');
	let newValue = true;
	newValue = $button.matches('[aria-pressed="true"]') ? false : true;
	if (newValue) {
		document.body.className = 'dark';
	} else {
		document.body.className = '';
	}
	this.setState({isDarkMode: newValue});
  }

  render() {
    return (
	  <button id="toggleModeButton" aria-pressed={this.state.isDarkMode} onClick={this.toggle}>
		<span className="sr-only">Toggle Dark Mode</span>
		<span className="sun-and-moon">
		  <span className="rays">
			<span className="ray" style={{'--index': 0, '--entry': 0, '--exit': 1}}></span>
			<span className="ray" style={{'--index': 1, '--entry': 1, '--exit': 2}}></span>
			<span className="ray" style={{'--index': 2, '--entry': 0, '--exit': 3}}></span>
			<span className="ray" style={{'--index': 3, '--entry': 1, '--exit': 4}}></span>
			<span className="ray" style={{'--index': 4, '--entry': 0, '--exit': 3}}></span>
			<span className="ray" style={{'--index': 5, '--entry': 1, '--exit': 2}}></span>
			<span className="ray" style={{'--index': 6, '--entry': 0, '--exit': 1}}></span>
			<span className="ray" style={{'--index': 7, '--entry': 1, '--exit': 0}}></span>
		  </span>
		  <span className="star" style={{'--index': 0}}></span>
		  <span className="star" style={{'--index': 1}}></span>
		  <span className="body"></span>
		</span>
	  </button>
    );
  }
}

export default ToggleModeButton;