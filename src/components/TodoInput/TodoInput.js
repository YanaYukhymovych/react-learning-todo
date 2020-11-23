import React from 'react'
import './TodoInput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const TodoInput = props => {
  return(
    
      <div className="TodoInput">
        {/* <label htmlFor="todo">Add new todo item:</label> */}
        <input type="text"
              id="todo"
              value={props.value}
              onChange={props.onChange}
              onKeyDown={props.onKeyDown}
              placeholder="Add todo">
        </input>

        <button onClick={props.onClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    
  )
}

export default TodoInput