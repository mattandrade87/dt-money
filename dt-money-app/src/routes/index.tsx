import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

const NavigationRoutes = () => {
  const [user, setUser] = useState()

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />
    }

    return <PrivateRoutes />
  }, [user])

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes
