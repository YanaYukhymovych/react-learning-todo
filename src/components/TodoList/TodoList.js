import React from 'react'
import'./TodoList.scss'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



const TodoList = (props) => {
    return (
      <div className="TodoList">
        

        {!!props.list.length && <ul>
          {/* // list = this.state.todoList   listItem = каждый элемент массива todoList*/}
          {props.list.map(( listItem, index) => {
            return (
              <li key={index} className={listItem.done ? 'done' : undefined}>


                {/* если у єлемента массива todoList есть атрибут done - добавляем строку done в класс*/}
                {listItem.text}

              
                  {/* conditional rendering - рендер по условию  "если - то" */}
                  <button className="done-btn" onClick={() => props.onDone(index)} // если прописываем аргумент у ф-ии - всешда через колбек
                  >
                    {(listItem.done && <FontAwesomeIcon icon={faCheck} />)}
                  </button>

                  <button className="delete-btn" onClick={() => props.onDelete(index)} 
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                
              </li>
            )
          })}
        </ul>}

        <div>

            {!!props.list.length && <Button type="secondary"
                    onClick={props.onDeleteAll}
                    title={'Delete all'} />}

            {!!props.list.length && <Button type="primary"
                    onClick={props.onDoneAll}
                    title={'Done all'} />}
        </div>
      </div>
    )
}

export default TodoList