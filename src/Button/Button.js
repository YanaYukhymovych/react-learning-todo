import React from 'react'
import './Button.css'

const Button = props => {
  const cls = ["Button", [props.type]]
   // создаем массив из возможных классов, что бы потом комбинировать их

  return(
    <button type={props.type}
            className={cls.join(' ')} // обьединяем класс Button с другими
            onClick={props.onClick}
            disabled={props.disabled}>
      {props.title || 'OK'}
    </button>
  )
}

export default Button