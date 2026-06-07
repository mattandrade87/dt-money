import { useAuthContext } from '@/context/auth.context'
import { NavigationContainer } from '@react-navigation/native'
import { useCallback } from 'react'
import { SystemBars } from 'react-native-edge-to-edge'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

const NavigationRoutes = () => {
  const { user, token } = useAuthContext()

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />
    }

    return <PrivateRoutes />
  }, [user, token])

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes
