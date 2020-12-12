import '../App.css';
import React, { Component } from 'react';
import QrReader from 'react-qr-scanner'

class QrScan extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 10000,
      result: 'No result',
    }
 
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){

    const previewStyle = {
      margin: "auto",
      height: 300,
      width: 300,
    }
 
    return(
      <div id='container'>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p id='qrname'>{this.state.result}</p>
      </div>
    )
  }
}

export default QrScan;


