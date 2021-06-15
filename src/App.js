import { useEffect, useState } from 'react'
import Card from './Components/Card'
import Form from './Components/Form'
import s from './App.module.scss'

const App = () => {
  const [state, setState] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(res => res.json())
      .then(result => {
        setState(result)
      })
  }, [])

  const removeTodo = id => {
    const removeTodos = [...state].filter(todo => todo.id !== id)
    setState(removeTodos)
  }

  const updateTodo = (id, newValue) => {
    const updateArr = state.map(item =>
      item.id === id ? { ...item, name: newValue } : item
    )
    setState(updateArr)
  }

  const addNewTodo = value => {
    if (!value || /^s*$/.test(value)) return
    setState([...state, { name: value, id: value }])
  }

  return (
    <div className={s.App}>
      <Form addNewTodo={addNewTodo} />
      <div className={s.cards}>
        {state.map((item, index) => (
          <Card
            key={item.id + index}
            item={item}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  )
}

export default App
