
import './style/App.css'
import HomePage from './components/HomePage'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
		<Header/>
		<Outlet/>
		{/* <HomePage/>  */}
    </>
  )
}

export default App
