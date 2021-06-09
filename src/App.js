import { useEffect, useState } from 'react'
import Card from './Components/Card'
import './App.css'

const App = () => {
  const [state, setState] = useState([])
  const [active, setActive] = useState(false)
  const [mode, setMode] = useState(false)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(res => res.json())
      .then(result => {
        setState(result)
      })
  }, [])

  const handler = () => {
    setActive(!active)
  }
  const revers = () => {
    setMode(!mode)
  }

  return (
    <div className='App'>
      <div>
        {state.map(item => (
          <Card key={item.id} activeAll={active} mode={mode} item={item} />
        ))}
      </div>
      <div>
        <button onClick={handler}>All</button>
      </div>
      <div>
        {!mode ? (
          <button onClick={revers}>Реверс</button>
        ) : (
          <button onClick={revers}>Синхронно</button>
        )}
      </div>
    </div>
  )
}

export default App
