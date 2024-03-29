import React, { Component } from 'react';
import TestComponent from './TestComponent';
import './App.css';

class ComponentList extends React.Component {
    removeComponent = (id) =>{
        this.props.removeComponent(id);
    }
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <TestComponent key={item.id} name={item.id} removeComponent={this.removeComponent.bind(this)}/>
      ))}
      </ul>
    );
  }
}

class RemoveButtonList extends React.Component {
    removeComponent= (id) =>{
        this.props.removeComponent(id);
    }

  render() {
    return (
      <div>
        {this.props.items.map(item => (
            <button key={item.id}
                    className="xianliao__button"
                    onClick={this.props.removeComponent.bind(this, item.id)}>Remove {item.id}</button>
      ))}
      </div>
    );
  }
}

class App extends Component {
    constructor (props){
        super(props);
        this.state={
            componentNum: 0,
            items:[],
        }
    }
    componentDidMount(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    componentDidUpdate(){
        window.brain.broadcastEvent('UPDATE_FOOTPRINT', true);
    }

    addComponent = () => {
        var newItem = {
            id: this.state.componentNum+1,
            text: 'test' + this.state.componentNum,
        };

        this.setState((prevState) => ({
            componentNum: prevState.componentNum + 1,
            items: prevState.items.concat(newItem),
        }));
    }

    removeComponent = (id) =>{
        let prevItems = this.state.items;
        var restItems = prevItems.filter((item)=>{
            return item.id !== id;
        })
        this.setState({
            items: restItems,
        })
    }

    alertMessage = () =>{
        alert('In React');
    }

  render() {
    return (
      <div className="App">
        <div className='xianliaome__component__container'>
            <div className="test">
                <button onClick={this.addComponent}
                        className='xianliao__button'>
                        Add
                </button>

                <RemoveButtonList items={this.state.items} removeComponent={this.removeComponent}/>
            </div>


            <ComponentList items={this.state.items}
                            removeComponent={this.removeComponent}
                            />

            <div className="transparent-layer"></div>
        </div>

      </div>
    );
  }
}

export default App;
