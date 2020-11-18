import React, { Component } from 'react'
import './ListCreator.css'
import TodoList from '../../components/TodoList/TodoList'
import Input from '../../components/TodoInput/Input'
import Button from '../../components/Button/Button'
import Modal from '../../components/Modal/Modal'
import { Link } from 'react-router-dom'
import ListTitle from '../../components/ListTitle/ListTitle'
import axios from 'axios'


class ListCreator extends Component {
  state = {
    inputValue: '',
    todoList: {  
      title: '', //string
      todo: [
        
      ]
    }, // [{ text: string, done: boolean }]
    isModalShow: false,
  }


  createItemHandler = event => {
    this.setState({ inputValue: event.target.value })
  }

  addItemHandler = () => {
    const todoList = {...this.state.todoList}
    todoList.todo.push({ id: this.state.todoList.todo.length + 1, text: this.state.inputValue, done: false })

    this.setState({
      todoList,
      inputValue: '' })

      // альтернативній вариант
      // this.setState((state) => 
      // ({todoList: [...state.todoList, state.inputValue],
      //   inputValue: '' }))
  }

  emptyItemHandler = () => {
      this.setState({
        inputValue: ''
      })
  }

  deleteItemHandler = index => {
    const todoList = {...this.state.todoList}
    todoList.todo.splice(index, 1)

    this.setState({
      todoList
    })
  }

  checkItemHandler = (index) => {
    const todoList = {...this.state.todoList}
    todoList.todo[index].done = true

    this.setState({
      todoList
    })
  }

  toggleModalHandler = () => {
    this.setState (state => ({
      isModalShow: !state.isModalShow
    })
    )
  }

  deleteAllHandler = () => {
    const todoList = { ...this.state.todoList }
    todoList.todo = []

    this.setState({
      todoList,
      isModalShow: false
    })

  }

  //перебирираем массив списка
  //  аргументом map являются каждый элемент масива который мы перебираем
  // после разворачиваем (делаем копию) изменяемого элемента и прсваиваем нвое значение
  doneAllHandler = () => {
    const todoList = { ...this.state.todoList }
    todoList.todo = todoList.todo.map(listItem => ({ ...listItem, done: true }));
    this.setState({ todoList });
  }


  changeTitleHandler = event => {
    const todoListCopy = { ...this.state.todoList };

    todoListCopy.title = event.target.value;

    this.setState({ todoList: todoListCopy })
  }

  saveListHandler = async event => {

    console.log(this.state.todoList)
    
      try { 
        await axios.post('https://todo-1239d.firebaseio.com/todo.json', this.state.todoList)
      } catch (e) {
        console.log(e)
      }
    }
  

  render() {
    

    return (
      <div className="ListCreator">

        <Link style={{textDecoration: 'none'}} 
              to={{pathname: "/",
              search: "?main=menu"}}>
            <Button   type="forward"
                      title={'Back to menu'} />
        </Link>

        <ListTitle onChange={this.changeTitleHandler}
                   value={this.state.todoList.title}
        />

        {this.state.isModalShow && <Modal onDelete={this.deleteAllHandler}
                                          onCancel={this.toggleModalHandler} 
              />}

        <TodoList list={this.state.todoList.todo} // єтот лист мі и передает в TodoList для map
                  onDelete={this.deleteItemHandler}
                  onDone={this.checkItemHandler}
                  onDeleteAll={this.toggleModalHandler}
                  onDoneAll={this.doneAllHandler} />

        <div>
          <Input onChange={this.createItemHandler} 
                 value={this.state.inputValue} />

          <Button type="primary"
                  onClick={this.addItemHandler}
                  disabled={this.state.inputValue.length === 0}
                  title={'Add +'} />

          <Button type="secondary"
                  onClick={this.emptyItemHandler}
                  disabled={this.state.inputValue.length === 0}
                  title={'Empty'} />  

          
        </div>

        <Button type="forward"
                onClick={this.saveListHandler}
                disabled={this.state.todoList.length === 0}
                title={'Save to my lists'}
        />
        
      </div>
    )
  }
}



export default ListCreator
