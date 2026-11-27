import { useState } from 'react'
import { AUTH_USER } from '../config/constants'


export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === AUTH_USER.username && password === AUTH_USER.password) {
      setError('')
      onLogin(username)
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-slate-800">Iniciar sesión</h1>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="admin"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Pass</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="1234"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700">
          Ingresar
        </button>
        <p className="text-center text-xs text-slate-400">Prueba: admin / 1234</p>
      </form>
    </div>
  )
}
