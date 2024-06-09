import { useState } from 'react'
import SignIn from './Pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignIn />
    </>
  )
}

export default App
