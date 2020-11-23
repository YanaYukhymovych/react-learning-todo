import React from 'react'
import './Modal.scss'
import Button from '../Button/Button'

const Modal = props => {
  return(
    <div className="Backdrop">
      <div className="Modal">
          <h1>Are you shure you want delete all list?</h1>

          <div>
            <Button type="secondary"
                    onClick={props.onDelete}
                    title={'Delete'}
            />

            <Button type="primary"
                    onClick={props.onCancel}
                    title={'Cancel'}/>
          </div>
      </div>

    </div>
  )
}

export default Modal