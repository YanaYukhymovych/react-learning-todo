import React, { useState, useEffect } from 'react'
import './MainPage.scss'
import ListItem from '../../components/ListItem/ListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


const MainPage = () => {

  // написание функционального компонента с применением hooks

  const [todoLists, setTodoLists] = useState([
    {
      title: '', //string
      todo: []
    }
  ]);

  const deleteListHandler = (index) => {
    const todoListsCopy = [...todoLists]
    todoListsCopy.splice(index, 1)

    setTodoLists(todoListsCopy)
  }

  // альтернативніе примері использования хука useEffect

  // 1. С асинхонной функцией внутри
  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get(`https://todo-1239d.firebaseio.com/todo.json`);
  //     const todo = response.data

  //     setTodoLists(Object.values(todo));
  //   })();
  // }, []);

  // 2. С обычной функцией
  
  useEffect(() => {
    axios.get(`https://todo-1239d.firebaseio.com/todo.json`).then(response => setTodoLists(Object.values(response.data)));
  }, []);

  return (
    <div className="MainPage">
        
      <h1>
        <FontAwesomeIcon icon={faCheckCircle} />
        My Todo lists
      </h1>
      

      <div>
        <ul>
          <Link to={{
            pathname: "/listcreator/new",
            search: "?create=new=list"
          }}>
            <li className="AddList">
              <FontAwesomeIcon className="AddIcon" icon={faPlus} size="3x" />
            </li>
          </Link>

          {todoLists.map((listItem, index) => {
            return (
              <Link to={`/listcreator/${listItem.id}`}
                key={index}

              >
                <ListItem
                  title={listItem.title}
                  onDelete={() => deleteListHandler(index)}
                />
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )

}

export default MainPage;
