import GithubIcon from '@src/modules/shared/assets/icons/github'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import { supabase } from '@src/modules/shared/utils/supabase'
import { PATH } from '../../routes/paths'

const Login = () => {
  const location = window.location.origin
  async function signInWithGithub() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location}${PATH.LOGIN}`,
        },
      })
      await getCurrentUser()
    } catch (err) {
      console.error('Unexpected error during GitHub login:', err)
    }
  }
  async function getCurrentUser() {
    const { data: user, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error.message)
    } else {
      console.log('Current user:', user)
    }
  }

  return (
    <div className="login-module">
      <CardBalance>
        <div className="login-module__card">
          <p className="login-module__card__title">Welcome</p>
          <p className="login-module__card__description">
            Login via your Github account to get started with our app
          </p>
          <button className="login-module__card__login-btn" onClick={signInWithGithub}>
            <GithubIcon className="login-module__card__login-btn-icon" />
            <p className="login-module__card__login-btn-text">Sign in with Github</p>
          </button>
        </div>
      </CardBalance>
    </div>
  )
}

export default Login
