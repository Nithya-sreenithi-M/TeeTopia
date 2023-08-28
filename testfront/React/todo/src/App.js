//import photo from './image.jpg';
import React from "react";
import './App.css';
 
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      newItem: "",
      list: []
    }
  }

  addItem(todoValue){
    if (todoValue !== "") {
      const newItem ={
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list:list,
        newItem: ""
      })
    }
  }


  deleteItem(id){
    const list = [...this.state.list];
    const updatedlist = list.filter(item => item.id !== id);

    this.setState({
      list: updatedlist
    })
  }

  updateInput(input){
    this.setState({newItem: input});
  }

  render(){
    return (
      <div>
        <h1 className='heading'>e_e.sa</h1>
        
        <div className='container'>
          <h3 className='container_heading'>Birthday plan</h3>
          <input
            type = 'text'
            className = 'input-text'
            placeholder = 'Item'
            required
            value={this.state.newItem}
            onChange ={(e) => console.log(e)}
          >
          </input>
          <button
            className='button'
            onClick={()=>this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
            >
            Add
            </button>
            <div
            className='list-plan-container'>
              <ul>
                  {this.state.list.map(item=>{
                    return(
                      <li key={item.id}> 
                       <input className="checkbox" type='checkbox' 
                       checked={item.isDone} onChange={()=>{}} 
                       name = '' id =''/>
                        {item.value}

                        <button className = 'deletebutton'
                          onClick={()=> this.deleteItem(item.id)}
                        >
                          Delete
                        </button>

                      </li>
                    )
                  })}
                  
                
              </ul>
            
            </div>

        </div>
        
        
      </div>
    )
  }
}

export default App;
