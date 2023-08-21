import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Form from './components/Form'
import styles from './App.module.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className={styles.app}>
      <Form />
    </div>
  )
}

export default App
