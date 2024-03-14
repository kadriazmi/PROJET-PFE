const Login = () => {
  async function signInWithGithub() {
    console.log('hello ')
  }

  return (
    <div className="login-module">
      <div className="login-module__card">
        <p className="login-module__card__title">Welcome</p>
        <button onClick={signInWithGithub}>login btn</button>
      </div>
    </div>
  )
}

export default Login
