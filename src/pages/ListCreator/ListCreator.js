import React, { useState } from 'react'
import './ListCreator.scss'
import TodoList from '../../components/TodoList/TodoList'
import TodoInput from '../../components/TodoInput/TodoInput'
import Button from '../../components/Button/Button'
import Modal from '../../components/Modal/Modal'
import { Link } from 'react-router-dom'
import ListTitle from '../../components/ListTitle/ListTitle'
import axios from 'axios'


const ListCreator = () => {

  // использование функционального компонента через useState (hook)

  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState({
    title: '', //string
    todo: [] // { text: string, done: boolean }
  });
  const [isModalShow, setIsModalShow] = useState(false);



  const createItemHandler = event => {
    setInputValue(event.target.value)
  }

  const addItemHandler = () => {
    const todoListCopy = { ...todoList }
    todoListCopy.todo.push({ id: todoList.todo.length + 1, text: inputValue, done: false })

    setTodoList(todoListCopy);
    setInputValue('');

    // альтернативній вариант
    // this.setState((state) => 
    // ({todoList: [...state.todoList, state.inputValue],
    //   inputValue: '' }))
  }

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      addItemHandler()
    }
  }


  const deleteItemHandler = index => {
    const todoListCopy = { ...todoList }
    todoListCopy.todo.splice(index, 1)

    setTodoList(todoListCopy)
  }

  const checkItemHandler = (index) => {
    const todoListCopy = { ...todoList }
    todoListCopy.todo[index].done = !todoListCopy.todo[index].done

    setTodoList(todoListCopy)
  }

  const toggleModalHandler = () => {
    setIsModalShow(!isModalShow)
  }

  const deleteAllHandler = () => {
    setTodoList(prevTodoList => ({ ...prevTodoList, todo: [] }));
    setIsModalShow(false)
  }

  //перебирираем массив списка
  //  аргументом map являются каждый элемент масива который мы перебираем
  // после разворачиваем (делаем копию) изменяемого элемента и прсваиваем нвое значение
  const doneAllHandler = () => {
    const todoListCopy = { ...todoList }
    todoListCopy.todo.forEach(listItem => (listItem.done = true));
    console.log(todoListCopy)

    setTodoList(todoListCopy)
  }
 


  const changeTitleHandler = event => {
    setTodoList(prevTodoList => ({ ...prevTodoList, title: event.target.value }))
  }

  const saveListHandler = async event => {

    try {
      await axios.post('https://todo-1239d.firebaseio.com/todo.json', todoList)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="ListCreator">

      <div className="navigation">
        <Link style={{ textDecoration: 'none' }}
          to={{
            pathname: "/",
          }}>
          <Button type="forward"
            title={'Back to menu'} />
        </Link>

        <Button type="forward"
          onClick={saveListHandler}
          disabled={todoList.length === 0}
          title={'Save to my lists'}
        />

      </div>

      
        <ListTitle onChange={changeTitleHandler}
                   value={todoList.title}
        /> 
      

      <div>
        <TodoInput onChange={createItemHandler}
                   value={inputValue}
                   onKeyDown={keyDownHandler}
                   onClick={addItemHandler}
                   />

      </div>

      {isModalShow && <Modal onDelete={deleteAllHandler}
        onCancel={toggleModalHandler}
      />}

      <TodoList list={todoList.todo} // єтот лист мі и передает в TodoList для map
        onDelete={deleteItemHandler}
        onDone={checkItemHandler}
        onDeleteAll={toggleModalHandler}
        onDoneAll={doneAllHandler} />

    </div>
  )
}


export default ListCreator
