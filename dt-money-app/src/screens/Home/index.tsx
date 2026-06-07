import { AppHeader } from '@/components/AppHeader'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}
