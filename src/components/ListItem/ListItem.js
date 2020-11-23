import React from 'react'
import './ListItem.scss'
import Button from '../Button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ListItem = props => {
  const onClickHandler = event => {
    event.preventDefault();
    props.onDelete();
  }
  return (
    <li className="ListItem">
        <Button type="trash"
                onClick={onClickHandler}
        > 
          <FontAwesomeIcon icon={faTrashAlt}  />
        </Button>
      <h3>{props.title}</h3>
      {props.children}
    </li>
  )
}

export default ListItem