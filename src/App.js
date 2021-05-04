import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MainPage from './pages'
import { getItem } from './helpers/helper'
import Routes from './routes/routes'
import AuthContext from './context/auth-context'
import Layout from './components/shared/layout'

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    let user = getItem('user')
    setUser(user)
  }, [])

  const token = getItem('token')

  return (
    <Router>
      <AuthContext.Provider value={user}>
        {!token
          ? <Route path="/" exact component={MainPage} />
          : <Layout><Routes /></Layout>
        }
        
      </AuthContext.Provider>
    </Router>
  )
}

export default App
