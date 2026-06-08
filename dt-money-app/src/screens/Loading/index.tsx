import { useAuthContext } from '@/context/auth.context'
import { colors } from '@/shared/colors'
import { FC, useEffect } from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoadingParams {
  setLoading: (value: boolean) => void
}

export const Loading: FC<LoadingParams> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext()

  useEffect(() => {
    ;(async () => {
      try {
        const user = await restoreUserSession()

        if (!user) {
          await handleLogout()
        }
      } catch {
        await handleLogout()
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary items-center justify-start pt-8">
      <>
        <Image
          source={require('@/assets/dt-money-logo.png')}
          className="h-16 w-16"
        />

        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  )
}
