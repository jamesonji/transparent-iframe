import React, { Component } from 'react';
import TestComponent from './TestComponent';
import TestComponent2 from './TestComponent2';
import TestComponent3 from './TestComponent3';
import './App.css';

class App extends Component {
    constructor (props){
        super(props);
        this.state={
            showComponents: false
        }
    }
    componentDidMount(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    componentWillUpdate(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    showComponent = () => {
        this.setState({
            showComponents: true
        })
    }

    closeComponent = () => {
        this.setState({
            showComponents: false
        })
    }

    alertMessage(){
        alert('In React');
    }

  render() {
    return (
      <div className="App">
        <div className='xianliaome__component__container'>
            <div className="test">
                <button onClick={this.state.showComponents? (this.closeComponent) : (this.showComponent)}
                        className='xianliao__add-element'>
                        Show/Close
                </button>
            </div>
            <div className='xianliao__fixed__container'>
                <TestComponent show={this.state.showComponents}/>
                <TestComponent2 show={this.state.showComponents}/>
                <TestComponent3 show={this.state.showComponents}/>
            </div>
        </div>

      </div>
    );
  }
}

export default App;
