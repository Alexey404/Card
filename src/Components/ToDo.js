import { CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import s from './ToDo.module.scss'

export const ToDo = ({ item, updateTodo, removeTodo }) => {
  const [isUpdate, setUpdate] = useState(false)
  const [newTodo, setNewTodo] = useState(item.value)

  const handler = () => {
    setUpdate(!isUpdate)
  }

  const newText = (e) => {
    if (e.length > 60) return
    setNewTodo(e.replace(/ +/g, ' '))
  }

  const updateClikc = () => {
    updateTodo(item.id, newTodo ? newTodo : null)
    handler()
  }

  return (
    <div className={s.toDo}>
      {isUpdate ? (
        <>
          <input
            className={s.inputToDo}
            value={newTodo}
            autoFocus={true}
            onChange={(e) => newText(e.currentTarget.value)}
            onBlur={updateClikc}
          />
        </>
      ) : (
        <span className={s.ToDoText} onDoubleClick={handler}>
          {item.value}
        </span>
      )}
      <div
        className={s.btnDelete}
        onClick={() => removeTodo(item.id, item.order)}
      >
        <CloseCircleOutlined />
      </div>
    </div>
  )
}
