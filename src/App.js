import React, { Component } from 'react'
import './App.css'
import Layout from './Layout/Layout'
import TodoList from './TodoList/TodoList'
import Input from './TodoInput/Input/Input'
import Button from './Button/Button'
import Modal from './Modal/Modal'



class App extends Component {
  state = {
    inputValue: '',
    todoList: [], // [{ text: string, done: boolean }]
    isModalShow: false
  }

  createItemHandler = event => {
    this.setState({ inputValue: event.target.value })
  }

  addItemHandler = () => {
    const todoList = [...this.state.todoList]
    todoList.push({ text: this.state.inputValue, done: false })

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
    const todoList = [...this.state.todoList]
    todoList.splice(index, 1)

    this.setState({
      todoList
    })
  }

  checkItemHandler = (index) => {
    const todoList = [...this.state.todoList]
    todoList[index].done = true

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
    this.setState({
      todoList: [],
      isModalShow: false
    })

  }

  //перебирираем массив списка
  //  аргументом map являются каждый элемент масива который мы перебираем
  // после разворачиваем (делаем копию) изменяемого элемента и прсваиваем нвое значение
  doneAllHandler = () => {
    this.setState(state => ({
      todoList: this.state.todoList.map(listItem => ({ ...listItem, done: true }))
    }))
  }

  render() {
    return (
      <Layout>
        {this.state.isModalShow && <Modal onDelete={this.deleteAllHandler}
                                          onCancel={this.toggleModalHandler} 
              />}

        <TodoList list={this.state.todoList} 
                  onDelete={this.deleteItemHandler}
                  onDone={this.checkItemHandler}
                  onDeleteAll={this.toggleModalHandler}
                  onDoneAll={this.doneAllHandler} />

        <div>
          <Input onChange={this.createItemHandler} 
                 value={this.state.inputValue} />

          <Button type="primery"
                  onClick={this.addItemHandler}
                  disabled={this.state.inputValue.length === 0}
                  title={'Add +'} />

          <Button type="secondary"
                  onClick={this.emptyItemHandler}
                  disabled={this.state.inputValue.length === 0}
                  title={'Empty'} />  

          
        </div>
      </Layout>
  )
}
  }


export default App