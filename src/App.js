import { useState } from 'react'
import s from './App.module.scss'
import Card from './Components/Card'
import Form from './Components/Form'

const App = () => {
  const [state, setState] = useState([
    { id: 1, name: '2', order: 2 },
    { id: 2, name: '1', order: 1 },
  ])
  const [currentToDo, setCurrentToDo] = useState('')

  const removeTodo = id => {
    const removeTodos = [...state].filter(todo => todo.id !== id)
    setState(removeTodos)
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
    setState([
      ...state,
      {
        id: Math.round(Math.random() * Math.random() * 1000 * Math.random()),
        name: value,
        order: state[0] ? state[state.length - 1].order + 1 : 1,
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
  }

  const sortCard = (a, b) => {
    if (a.order > b.order) {
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
