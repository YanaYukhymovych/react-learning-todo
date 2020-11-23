import React, { useState } from 'react'
import './ListTitle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const ListTitle = props => {

  const [titleBeingEdited, setTitleBeingEdited] = useState(true);

  const onBlurHandler = () => {
    if (props.value) {
      setTitleBeingEdited(false)
    }
  }

  return (

    <h1 className="ListTitle"
        onClick={() => setTitleBeingEdited(true)}>
        {titleBeingEdited
          ? <input type="text"
            id="TitleInput"
            value={props.value}
            placeholder="Enter list name"
            onChange={props.onChange}
            onBlur={onBlurHandler}
            autoFocus={true}
            />
          : <div>
              {props.value}
              <FontAwesomeIcon icon={faPencilAlt} style={{ width: '15px' }} />
            </div>
        }
    </h1>
  )
}

export default ListTitle