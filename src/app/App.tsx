import { useEffect } from 'react'
import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { login } from '@src/modules/auth/data/authThunk'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  const dispatch = useAppDispatch()
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)
  useEffect(() => {
    dispatch(login())
  }, [])

  return (
    <div id={theme}>
      <Helmet>
        <title>Welcome - Github code reviewer</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
    </div>
  )
}

export default App
