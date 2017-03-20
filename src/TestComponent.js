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
        this.props.removeComponent(id);
    }

    alertMessage = () =>{
        alert('In React');
    }

  render() {
    return (
        <div className='xianliaome__component__container' key={this.props.name}>
        {this.props.show?
            <div className="test-1" onClick={this.alertMessage}>
                <div className="xianliao">
                    <p>Test {this.props.name}</p>
                </div>
            </div>
            :
            null
        }
        </div>);
  }
}
