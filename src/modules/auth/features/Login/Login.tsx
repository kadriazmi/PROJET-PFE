import { useEffect, useRef, useState } from 'react'
import GithubIcon from '@src/modules/shared/assets/icons/github'
import { supabase } from '@src/modules/shared/utils/supabase'
import { message } from 'antd'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import Canvas from '@src/modules/shared/components/Canvas/Canvas'
import { PATH } from '../../routes/paths'
const Login = () => {
  const currentPageUrl = window.location.origin
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${currentPageUrl}${PATH.LOGIN}`,
      },
    })
    await supabase.auth.getSession()
    message.success('Sign in successfuly')
  }

  return (
    <div className="login-module">
      <CardBalance>
        <p className="card-balance-title">Welcome</p>
        <p className="card-balance-description">
          Login via your Github account to get started <br />
          with our app
        </p>
        <div className="card-balance-loginbtn " onClick={signInWithGithub}>
          <GithubIcon className="card-balance-loginbtn-icon" />
          <p className="card-balance-loginbtn-text">Sign in with Github</p>
        </div>
      </CardBalance>
      <Canvas />
    </div>
  )
}

export default Login
