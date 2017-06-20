import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class HelloWorld extends React.Component {
	render() {
		return(
			<h1>Hellow World</h1>
		)
	}
}




ReactDom.render(<HelloWorld />, document.getElementById("root"))