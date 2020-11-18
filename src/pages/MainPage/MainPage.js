import React, { Component } from 'react'
import './MainPage.css'
import ListItem from '../../components/ListItem/ListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class MainPage extends Component {
  state = {
    todoLists: [
      {
      title: '', //string
      todo: []
    }
    ]
  }

  deleteListHandler = (index) => {
    const todoLists = [...this.state.todoLists]
    todoLists.splice(index, 1)

    this.setState ({
      todoLists
    })
  }

  async componentDidMount() {

    const response = await axios.get(`https://todo-1239d.firebaseio.com/todo.json`)
    const todo = response.data

    this.setState ({
        todoLists: Object.values(todo)
    })
   }

   
  
  

  render() {

    return (
      <div className="MainPage">
        <h1>My Todo lists</h1>
        <div>
            <ul>
              <Link to={{pathname: "/listcreator/new",
                        search: "?create=new=list"
                        }}>
                <li className="AddList">
                  <FontAwesomeIcon className="AddIcon" icon={faPlus} size="3x" />
                </li>
              </Link>

              {this.state.todoLists.map((listItem, index) => {
                return (
                  <Link to={`/listcreator/${listItem.id}`}
                  key={index}

                  >
                    <ListItem 
                              title={listItem.title}
                              onDelete={() => this.deleteListHandler(index)}
                    />
                  </Link>
                )
              })}
            </ul>
        </div>
      </div>
    )
  }
}
