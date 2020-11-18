import React, { Component } from 'react'
import'./TodoList.css'
import Button from '../Button/Button'

export default class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        <div>

          {!!this.props.list.length && <Button type="deleteAll"
                  onClick={this.props.onDeleteAll}
                  title={'Delete all'} />}

           {!!this.props.list.length && <Button type="doneAll"
                   onClick={this.props.onDoneAll}
                   title={'Done all'} />}
        </div>
        

        {!!this.props.list.length && <ul>
          {/* // list = this.state.todoList   listItem = каждый элемент массива todoList*/}
          {this.props.list.map(( listItem, index) => {
            return (
              <li key={index} className={listItem.done ? 'done' : undefined}>
                {/* если у єлемента массива todoList есть атрибут done - добавляем строку done в класс*/}
                {listItem.text}

                <button onClick={() => this.props.onDelete(index)} 
                style={{color: 'red', borderRadius: '5px', marginLeft: '5px'}}
                >
                  X
                </button>

                {/* conditional rendering - рендер по условию  "если - то" */}
                { !listItem.done && <button onClick={() => this.props.onDone(index)} // если прописываем аргумент у ф-ии - всешда через колбек
                style={{color: 'green', borderRadius: '5px', marginLeft: '5px'}}
                >
                  V
                </button>}
              </li>
            )
          })}
        </ul>}
      </div>
    )
  }
}