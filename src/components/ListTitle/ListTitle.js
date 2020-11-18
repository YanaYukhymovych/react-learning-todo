import React from 'react'
import './ListTitle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const ListTitle = props => {
  return (
    <h1 className="ListTitle">
          <input  type="text"
                  id="TitleInput"
                  value={props.value}
                  placeholder="Enter list name"
                  onChange={props.onChange}
          >
          </input>
          <label htmlFor="TitleInput">
            <FontAwesomeIcon  icon={faPencilAlt} style={{width: '20px'}}/>
          </label>
    </h1>
  )
}

export default ListTitle