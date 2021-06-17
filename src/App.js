import { useState } from 'react'
import s from './App.module.scss'
import Card from './Components/Card'
import Form from './Components/Form'

const App = () => {
  const [state, setState] = useState([{ id: 1, name: 'Welcome', order: 1 }])
  const [currentToDo, setCurrentToDo] = useState('')

  const removeTodo = (id, order) => {
    setState(
      [...state]
        .filter(todo => todo.id !== id)
        .map(item => {
          if (item.order > order) {
            return { ...item, order: item.order - 1 }
          }
          return item
        })
    )
  }

  const updateTodo = (id, newValue) => {
    if (newValue === null) {
      removeTodo(id)
      return
    }
    const updateArr = state.map(item =>
      item.id === id ? { ...item, name: newValue } : item
    )
    setState(updateArr)
  }

  const addNewTodo = value => {
    if (!value || /^s*$/.test(value)) return
    setState([
      ...state,
      {
        id:
          Math.max.apply(
            Math,
            state.map(i => {
              return i.id
            })
          ) + 1,
        name: value,
        order: state[0]
          ? Math.max.apply(
              Math,
              state.map(i => {
                return i.order
              })
            ) + 1
          : 1,
      },
    ])
  }

  const dropHandler = (e, card) => {
    e.preventDefault()

    setState(
      state.map(c => {
        if (c.id === card.id) {
          return { ...c, order: currentToDo.order }
        }
        if (c.id === currentToDo.id) {
          return { ...c, order: card.order }
        }
        return c
      })
    )

    e.target.style = {
      background: 'linear-gradient(90deg, rgb(15, 11, 250), rgb(119, 22, 114))',
    }
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
      <Form addNewTodo={addNewTodo} />
      <div className={s.cards}>
        {state.sort(sortCard).map((item, index) => (
          <Card
            key={item.id}
            item={item}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            setCurrentToDo={setCurrentToDo}
            dropHandler={dropHandler}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default App
