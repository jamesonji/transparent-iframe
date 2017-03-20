import React, { Component } from 'react';

export default class TestComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.name,
        }
    }

    componentDidMount(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    componentDidUpdate(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    componentDidUnMount(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    removeComponent = (id) => {
        alert(id);
        this.props.removeComponent(id);
    }

    alertMessage = () =>{
        alert(`In React Component ${this.state.id}`);
    }

  render() {
    return (
        <div className='xianliaome__component__container' key={this.props.name}>
            <div className="test-1" onClick={this.alertMessage}>
                <div className="xianliao">
                    <p>Test {this.props.name}</p>
                </div>
            </div>
        </div>);
  }
}
