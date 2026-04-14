import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/hello')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>Frontend</h1>
      <p>Response: {message}</p>
    </div>
  )
}

export default App
