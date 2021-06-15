import { useState } from 'react'
import s from './Card.module.scss'

const Form = ({ addNewTodo }) => {
  const [state, setstate] = useState('')

  const addCard = () => {
    addNewTodo(state)
    setstate('')
  }

  const newText = e => {
    const newValue = e.currentTarget.value
    if (newValue.length > 40) return
    setstate(newValue)
  }

  return (
    <>
      <div className={s.form}>
        <input className={s.input} value={state} onChange={newText} />
        <button className={s.btn} onClick={addCard}>
          Add
        </button>
      </div>
    </>
  )
}

export default Form
