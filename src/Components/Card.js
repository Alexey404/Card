import { useEffect, useState } from 'react'

const Card = ({ item, activeAll, mode }) => {
  const [active, setActive] = useState(activeAll)

  useEffect(() => {
    setActive(mode ? !active : activeAll)
  }, [activeAll])

  const handler = () => {
    setActive(!active)
  }

  const color = active ? 'green' : 'red'

  return (
    <div onClick={handler} style={{ color }}>
      {item.name}
    </div>
  )
}

export default Card
