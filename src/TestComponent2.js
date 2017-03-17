import React, { Component } from 'react';

export default class TestComponent extends Component {
    componentDidMount(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    componentDidUpdate(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    alertMessage(){
        alert('In React');
    }

  render() {
    return (
        <div className='xianliaome__component__container'>
        {this.props.show ?
            (<div className="test-2" onClick={this.alertMessage}>
                <div className="xianliao">
                    <p>TEST 2</p>
                </div>
            </div>)
                :
                null
            }
        </div>);
  }
}
