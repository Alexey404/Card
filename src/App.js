import { useState } from 'react'
import s from './App.module.scss'
import Form from './Components/Form'
import { ToDo } from './Components/ToDo'

export const App = () => {
  const [state, setState] = useState([{ id: 1, value: 'Welcome', order: 1 }])

  const removeTodo = (id, order) => {
    setState(
      [...state]
        .filter((todo) => todo.id !== id)
        .map((item) =>
          item.order > order ? { ...item, order: item.order - 1 } : item
        )
    )
  }

  const updateTodo = (id, value) => {
    value
      ? setState(
          state.map((item) => (item.id === id ? { ...item, value } : item))
        )
      : removeTodo(id)
  }

  const newTodo = (key) => {
    return state[0]
      ? Math.max.apply(
          Math,
          state.map((i) => {
            return i[key]
          })
        ) + 1
      : 1
  }

  const addNewTodo = (value) => {
    setState([
      ...state,
      {
        id: newTodo('id'),
        value,
        order: newTodo('order'),
      },
    ])
  }

  const sortCard = (a, b) => {
    if (a.order < b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className={s.App}>
      <div className={s.heading}>Welcome</div>
      <Form addNewTodo={addNewTodo} />
      <div style={{ display: 'flex', height: '60%' }}>
        <div className={s.cards}>
          {state.sort(sortCard).map((item, index) => (
            <ToDo
              key={item.id}
              item={item}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
