const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password }) => {
  return (
    <div>
      <h2>Log in to the app</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
              Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
              Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
