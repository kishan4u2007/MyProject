import React, {Component} from 'react';


const API = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';
const channelID = 'UCXgGY0wkgOzynnHvSEVmE3A';
const maxResults = 5;

// https://www.googleapis.com/youtube/v3/search?key=AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet,id&order=date&maxResults=10

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`

class Youtube extends Component {

	constructor(props){
	    super(props);
	    this.state = {
	      resultyt: []
	    };
	    this.clicked = this.clicked.bind(this);
	 }

	

	clicked(){
		fetch(finalURL)
	      .then((response) => response.json())
	      .then((responseJson) => {
	        //console.log(responseJson)
	        const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/" + obj.id.videoId);
	        	//var id = obj.id.videoId; we can also do it in a simple
	           	this.setState({resultyt});
	      })
	      .catch((error) => {
	        console.error(error);
	      });
	 }

	render() {
			//console.log(this.state.resultyt);
		return (
			<div>
			 <button onClick={this.clicked}>Get youtube videos</button>			 	{
					this.state.resultyt.map((link, i) => {
						var frame = <div key={i} className="youtube"><iframe title="This is a unique title" width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe></div>;
						return frame;
					})
				}
			</div>
		);
	}
}

export default Youtube;
