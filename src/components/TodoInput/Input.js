import React from 'react'
import './Input.css'

const Input = props => {
  return(
    
      <div className="Input">
        <label htmlFor="todo">Add new todo item:</label>
        <input type="text"
              id="todo"
              value={props.value}
              onChange={props.onChange}>
        </input>
      </div>
    
  )
}

export default Input