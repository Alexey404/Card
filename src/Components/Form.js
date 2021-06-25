import { useState } from 'react'
import s from './ToDo.module.scss'

const Form = ({ addNewTodo }) => {
  const [state, setState] = useState('')

  const addTodo = () => {
    addNewTodo(state)
    setState('')
  }

  const newText = (newValue) => {
    if (newValue.length > 30) return
    setState(newValue.replace(/ +/g, ' '))
  }

  return (
    <>
      <div className={s.form}>
        <input
          className={s.input}
          placeholder={'Add To Do'}
          value={state}
          onChange={(e) => newText(e.currentTarget.value)}
        />
        <button className={s.btn} onClick={addTodo}>
          Add
        </button>
      </div>
    </>
  )
}

export default Form
