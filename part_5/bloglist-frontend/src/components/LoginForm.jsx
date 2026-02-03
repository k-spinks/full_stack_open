import { useState } from 'react'

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username: username, password:password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login to application</h1>
      <label htmlFor="username">
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm