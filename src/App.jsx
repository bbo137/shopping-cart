import './App.css'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <Navigate to="/home" replace={true} />
  )
}

export default App
