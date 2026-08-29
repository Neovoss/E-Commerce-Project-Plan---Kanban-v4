import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../utils/auth.js'

// Giris yapmamis kullanici Login sayfasina yonlendiriliyor, geldigi sayfa state'te tasiniyor
export default function ProtectedRoute({ children, ...rest }) {
  const user = useSelector((state) => state.client.user)
  const hasSession = Boolean(user?.email) || Boolean(getToken())

  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasSession ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  )
}
