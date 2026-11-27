import { useState } from 'react'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Sum from './pages/Sum'
import Calculator from './pages/Calculator'
import ApiSearch from './pages/ApiSearch'
import FormScreen from './pages/FormScreen'

// Sin React Navigation: la "navegación" es un estado + renderizado condicional.
export default function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState('menu')

  const goMenu = () => setScreen('menu')
  const logout = () => {
    setUser(null)
    setScreen('menu')
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="min-h-screen bg-slate-100">
      {screen === 'menu' && <Menu user={user} onSelect={setScreen} onLogout={logout} />}
      {screen === 'sum' && <Sum onBack={goMenu} />}
      {screen === 'calculator' && <Calculator onBack={goMenu} />}
      {screen === 'api' && <ApiSearch onBack={goMenu} />}
      {screen === 'form' && <FormScreen onBack={goMenu} />}
    </div>
  )
}
