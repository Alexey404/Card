import { useState } from 'react'
import s from './Card.module.scss'
import { AiFillDelete } from 'react-icons/ai'

const Card = ({ item, removeTodo, updateTodo }) => {
  const [isUpdate, setUpdate] = useState(false)
  const [active, setActive] = useState(false)
  const [newTodo, setNewTodo] = useState(item.name)

  const handler = () => {
    setUpdate(!isUpdate)
  }
  const handlerActive = () => {
    setActive(!active)
  }
  const newText = e => {
    const newValue = e.currentTarget.value
    if (newValue.length > 40) return
    setNewTodo(newValue)
  }

  const updateClikc = () => {
    if (!newTodo) {
      updateTodo(item.id, null)
    }
    if (/^s*$/.test(newTodo)) return
    updateTodo(item.id, newTodo)
    handler()
  }

  return (
    <div className={s.card}>
      {isUpdate ? (
        <>
          <input
            className={s.inputCard}
            value={newTodo}
            autoFocus={true}
            onChange={newText}
            onBlur={updateClikc}
          />
        </>
      ) : (
        <>
          <span
            className={s.cardText}
            onClick={handlerActive}
            onDoubleClick={handler}
          >
            {item.name}
          </span>
        </>
      )}
      <span className={s.btnDelete} onClick={() => removeTodo(item.id)}>
        <AiFillDelete color={'rgb(250, 99, 11)'} width='30px' />
      </span>
    </div>
  )
}

export default Card
